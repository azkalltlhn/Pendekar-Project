use actix_web::{
    web, body::MessageBody, HttpMessage,
    post, dev::{ServiceResponse, ServiceRequest}, HttpResponse,
    cookie::Cookie, http::StatusCode
};
use actix_web_lab::middleware::Next;
use sqlx::{PgPool, prelude::FromRow};
use rand::{thread_rng, Rng, distributions::Alphanumeric};
use crate::app::error::CustomError;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, FromRow)]
pub struct Account {
    pub id: i16,
    pub nama: String,
    pub pendidikan_terakhir: Option<String>,
    pub email: String,
}

pub async fn login_mw(
    req: ServiceRequest,
    next: Next<impl MessageBody>,
) -> Result<ServiceResponse<impl MessageBody>, actix_web::Error> {
    
    // untuk register menggunakan req path /account/register
    println!("path: {}", req.path());
    if req.path() == "/login" || req.path() == "/account/register" { 
        println!("login nih");
        return next.call(req).await;
    }

    let err = Err(actix_web::error::ErrorUnauthorized("Silakan login dulu"));

    let cookie = match req.cookie("adm-sess-id") 
        { Some(ck) => ck, None => return err };

    let pool = match req.app_data::<web::Data<PgPool>>() 
        { Some(pl) => pl, None => return err };

    println!("cookie value: {:?}", cookie.value());
    let account: Vec<Account> = match sqlx::query_as(r#"
        select account.id, nama, pendidikan_terakhir::text, email
        from account where token=$1"#
    )
    .bind(cookie.value())
    .fetch_all(pool.get_ref()) .await
    { Ok(row) => row, Err(_) => return err };

    println!("pool: {:?}", pool);
    req.request().extensions_mut().insert(account);

    return next.call(req).await;

}

#[derive(serde::Deserialize, Debug)]
struct LoginForm {
    username: String,
    password: String
}

#[post("/login")]
async fn login(pool: web::Data<PgPool>, form: web::Json<LoginForm>)
    -> Result<HttpResponse, CustomError> {

        // let password: Vec<u8> = form.password;

        let account: Vec<Account> = match sqlx::query_as(r#"
            SELECT id, nama, pendidikan_terakhir::text, email
            FROM account
            WHERE username = $1 AND password = $2"#)
            .bind(&form.username)
            .bind(&form.password)
            .fetch_all(pool.get_ref()) 
            .await
        { Ok(account) => account, _ => return 
            Ok(HttpResponse::Ok().body("login gagal")) };

        let account = account.first().cloned(); // Ambil baris pertama jika ada
        let account = match account {
            Some(account) => account,
            None => return Ok(HttpResponse::build(StatusCode::UNAUTHORIZED).body("Tidak ada akun yang cocok")),
        };

    let rand_string: String = thread_rng()
        .sample_iter(&Alphanumeric)
        .take(30)
        .map(char::from)
        .collect();

    let _ = sqlx::query(
        "UPDATE account SET token = $1 WHERE id = $2")
        .bind(rand_string.clone()) // Menggunakan .clone() untuk menghindari masalah move
        .bind(account.id)
        .execute(pool.get_ref())
        .await?;

    let response = HttpResponse::Ok()
        .cookie(Cookie::build("adm-sess-id", rand_string).finish())
        .json(account);  // langsung lemparkan informasi account ke FE

    Ok(response)
}