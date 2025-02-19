// use actix_multipart::{MultipartError, Field};
// use actix_web::web::Payload;
use actix_web::{Responder, HttpResponse, get, web, post, put};
use sqlx::PgPool;
use serde::{Serialize, Deserialize};
use crate::app::{Result, MyResult};
use chrono::{NaiveDateTime, ParseError};
use actix_web_lab::extract::Path;
use uuid::Uuid;
use std::{fs, result}; 
// use std::pin::Pin;
// use actix_multipart::Multipart;
use actix_multipart::form::MultipartForm;
use actix_multipart::form::tempfile::TempFile;
use actix_multipart::form::text::Text;
use std::io::Read;

pub fn services() -> actix_web::Scope {
    web::scope("/account")
        .service(index)
        .service(get_profile_picture)
        .service(create_account)
        .service(update_profile)
}

fn parse_date(date_str: &str) -> MyResult<NaiveDateTime> {
    let parsed_result: result::Result<NaiveDateTime, ParseError> =
        NaiveDateTime::parse_from_str(date_str, "%Y-%m-%dT%H:%M:%S");
    MyResult::from_result_with_parse_error(parsed_result)
}

#[derive(Debug, MultipartForm)]
pub struct GetAccount {
    id: Text<i16>,
    nama: Text<String>,
    tanggal_lahir: Text<String>,
    nomor_telepon: Text<String>,
    email: Text<String>,
    pendidikan_terakhir: Text<PendidikanTerakhir>,
    semester: Text<Semester>,
    username: Text<String>,
    #[multipart(limit = "60 MiB")]
    foto_profile: Vec<TempFile>,
    password: Text<String>,
}

#[derive(Serialize, Deserialize, sqlx::Type, Debug, Clone)]
#[sqlx(type_name = "pendidikan_terakhir")]
enum PendidikanTerakhir {
    SD, SMP, SMA, D3, S1, S2, S3,
}

#[derive(Serialize, Deserialize, sqlx::Type, Debug)]
#[sqlx(type_name = "semester")]
enum Semester {
    Semester1, Semester2, Semester3, Semester4,
    Semester5, Semester6, Semester7, Semester8,
}

impl ToString for PendidikanTerakhir {
    fn to_string(&self) -> String {
        match self {
            PendidikanTerakhir::SD => "SD".to_string(),
            PendidikanTerakhir::SMP => "SMP".to_string(),
            PendidikanTerakhir::SMA => "SMA".to_string(),
            PendidikanTerakhir::D3 => "D3".to_string(),
            PendidikanTerakhir::S1 => "S1".to_string(),
            PendidikanTerakhir::S2 => "S2".to_string(),
            PendidikanTerakhir::S3 => "S3".to_string(),
        }
    }
}


impl ToString for Semester {
    fn to_string(&self) -> String {
        match self {
            Semester::Semester1 => "Semester 1".to_string(),
            Semester::Semester2 => "Semester 2".to_string(),
            Semester::Semester3 => "Semester 3".to_string(),
            Semester::Semester4 => "Semester 4".to_string(),
            Semester::Semester5 => "Semester 5".to_string(),
            Semester::Semester6 => "Semester 6".to_string(),
            Semester::Semester7 => "Semester 7".to_string(),
            Semester::Semester8 => "Semester 8".to_string(),
        }
    }
}


// #[derive(Debug, Serialize, Deserialize, sqlx::Type)]
// #[sqlx(type_name = "pendidikan_terakhir")]
// enum PendidikanTerakhir {
//     SD, SMP, SMA, D3, S1, S2, S3,
// }

// #[derive(Debug, Serialize, Deserialize, sqlx::Type)]
// #[sqlx(type_name = "semester")]
// enum Semester {
//     Semester1, Semester2, Semester3, Semester4,
//     Semester5, Semester6, Semester7, Semester8,
// }

#[derive(Serialize, Deserialize, sqlx::FromRow)]
struct Account {
    id: Option<i16>,
    foto_profile: Option<String>,
    nama: Option<String>,
    tanggal_lahir: NaiveDateTime,
    nomor_telepon: Option<String>,
    email: Option<String>,
    pendidikan_terakhir: PendidikanTerakhir,
    semester: Semester,
    username: Option<String>,
    password: Option<String>,
}

#[get("/{id}")]
pub async fn index(pool: web::Data<PgPool>, Path(id): Path<i16>) -> Result<impl Responder> {
    let accounts = sqlx::query_as(
        "SELECT id, foto_profile, nama, tanggal_lahir, nomor_telepon, email, pendidikan_terakhir, 
        semester, username, password FROM account where id=$1",
    )
    .bind(&id)
    .fetch_all(pool.get_ref())
    .await?;

    let accounts: Vec<Account> = accounts
        .into_iter()
        .map(|account: Account| -> Account {
            Account {
                id: account.id,
                foto_profile: account.foto_profile,
                nama: account.nama,
                tanggal_lahir: account.tanggal_lahir,
                nomor_telepon: account.nomor_telepon,
                email: account.email,
                pendidikan_terakhir: account.pendidikan_terakhir,
                semester: account.semester,
                username: account.username,
                password: account.password,
            }
        })
        .collect();

    Ok(web::Json(accounts))
}

#[get("/profile-picture/{filename}")]
pub async fn get_profile_picture(filename: web::Path<String>) -> Result<HttpResponse> {
    let file_path = format!("src/img/{}", filename);

    if let Ok(file_content) = fs::read(&file_path) {
        let content_type = match filename.split('.').last() {
            Some("png") => "image/png",
            Some("jpg") | Some("jpeg") => "image/jpeg",
            Some("gif") => "image/gif",
            _ => "application/octet-stream",
        };

        Ok(HttpResponse::Ok()
            .content_type(content_type)
            .body(file_content))
    } else {
        Ok(HttpResponse::NotFound().finish())
    }
}

#[post("/register")]
async fn create_account(pool: web::Data<PgPool>, account: web::Json<Account>)
    -> Result<impl Responder>
    {
    let check = sqlx::query(
        "SELECT* from account WHERE username = $1"
    ).bind(&account.username)
    .fetch_optional(pool.get_ref()).await? ;

    if !check.is_some() {
        let _res = sqlx::query(
        "insert into account (nama, tanggal_lahir, nomor_telepon, email, pendidikan_terakhir, semester, username, password) 
        values ($1, $2, $3, $4, $5, $6, $7, $8)")
        .bind(&account.nama)    // -> mengisi $1
        .bind(&account.tanggal_lahir)    // -> mengisi $2
        .bind(&account.nomor_telepon)
        .bind(&account.email)
        .bind(&account.pendidikan_terakhir)
        .bind(&account.semester)
        .bind(&account.username)
        .bind(&account.password)  // -> mengisi $3
        .execute(pool.get_ref()) .await? ;
        Ok(HttpResponse::Created().body("Registrasi Berhasil."))
    }else{
        Ok(HttpResponse::Conflict().body("Akun sudah terdaftar."))
    }  
}

#[post("/profile")] 
async fn create(pool: web::Data<PgPool>,MultipartForm(req): MultipartForm<GetAccount>
) -> Result<impl Responder> { 
    let password = req.password;
    let imagename = Uuid::new_v4(); 
    for f in req.foto_profile {
        let destination_path = format!("src/img/{}.png",&imagename);
        let mut file = f.file.as_file().to_owned();
        let mut data = Vec::new();
        file.read_to_end(&mut data).expect("gagal simpan file ke vec<u8> !");
        // Create the new file and write the data to it
        fs::write(destination_path, &data).expect("gagal simpan file");
        println!("img done");
    }

    let foto_profile = format!("{}.png",&imagename);
    // let id = req.id.abs();
    let nama = req.nama.to_string();
    let tanggal_lahir = req.tanggal_lahir.to_string();
    let nomor_telepon = req.nomor_telepon.to_string();
    let email = req.email.to_string();
    let semester = req.semester.to_string();
    let pendidikan_terakhir = req.pendidikan_terakhir.to_string();
    let username = req.username.to_string();
    let password = password.into_inner(); 

    let _res = sqlx::query( 
        "insert into account (foto_profile, nama, tanggal_lahir, nomor_telepon, email, pendidikan_terakhir, semester, username, password) 
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9)")
        .bind(foto_profile)
        .bind(nama)    // -> mengisi $1
        .bind(tanggal_lahir)    // -> mengisi $2
        .bind(nomor_telepon)
        .bind(email)
        .bind(pendidikan_terakhir)
        .bind(semester)
        .bind(username)
        .bind(password)  // -> mengisi $3
        .execute(pool.get_ref()) .await? ; 
    // .fetch_one(pool.get_ref()) 
    // .await?; 
 
    Ok(HttpResponse::Ok().body("Success")) 
}

#[put("/update")]
async fn update_profile(pool: web::Data<PgPool>, MultipartForm(req): MultipartForm<GetAccount>) -> Result<impl Responder> {
    let password = req.password;
    let imagename = Uuid::new_v4();
    let id = req.id.abs();
    let nama = req.nama.to_string();
    let tanggal_lahir = req.tanggal_lahir.to_string();

    
    let parsed = match parse_date(&tanggal_lahir).into_inner() {
        Ok(parsed_date) => parsed_date,
        Err(err) => return Ok(HttpResponse::BadRequest().body(err.to_string())),
    };

    let nomor_telepon = req.nomor_telepon.to_string();
    let email = req.email.to_string();
    let semester = req.semester.into_inner();
    let pendidikan_terakhir = req.pendidikan_terakhir.to_string();
    let username = req.username.to_string();
    let password = password.into_inner(); // Extract the String from Text
    if let Some(f) = req.foto_profile.first() {
        // User uploaded a photo
        let destination_path = format!("src/img/{}.png", &imagename);
        let mut file = f.file.as_file().to_owned();
        let mut data = Vec::new();
        file.read_to_end(&mut data).expect("Failed to read file into Vec<u8>!");
        fs::write(destination_path, &data).expect("Failed to write file");

        let foto_profile = format!("{}.png", &imagename);

        let _res = sqlx::query(
            "UPDATE account SET
             foto_profile = $2, nama = $3, tanggal_lahir = $4,
             nomor_telepon = $5, email = $6, pendidikan_terakhir = $7::pendidikan_terakhir,
             semester = $8::semester, username = $9, password = $10
             WHERE id = $1",
        )
        .bind(id)
        .bind(foto_profile)
        .bind(nama.clone())
        .bind(parsed)
        .bind(nomor_telepon.clone())
        .bind(email.clone())
        .bind(pendidikan_terakhir.clone())
        .bind(semester)
        .bind(username.clone())
        .bind(password.clone())
        .execute(pool.get_ref())
        .await?;

        Ok(HttpResponse::Ok().body("Data berhasil diupdate dengan foto"))
    } else {
        // User did not upload a photo
        let _res = sqlx::query(
            "UPDATE account SET
             nama = $2, tanggal_lahir = $3,
             nomor_telepon = $4, email = $5, pendidikan_terakhir = $6::pendidikan_terakhir,
             semester = $7::semester, username = $8, password = $9
             WHERE id = $1",
        )
        .bind(id)
        .bind(nama)
        .bind(parsed)
        .bind(nomor_telepon)
        .bind(email)
        .bind(pendidikan_terakhir)
        .bind(semester)
        .bind(username)
        .bind(password)
        .execute(pool.get_ref())
        .await?;

        Ok(HttpResponse::Ok().body("Data berhasil diupdate tanpa foto"))
    }
}

// #[put("/update")]
// async fn update_profile(pool: web::Data<PgPool>, MultipartForm(req): MultipartForm<GetAccount>) -> Result<impl Responder> {
//     let password = req.password;
//     let imagename = Uuid::new_v4();
//     for f in req.foto_profile {
//         let destination_path = format!("src/img/{}.png", &imagename);
//         let mut file = f.file.as_file().to_owned();
//         let mut data = Vec::new();
//         file.read_to_end(&mut data).expect("gagal simpan file ke vec<u8> !");
//         fs::write(destination_path, &data).expect("gagal simpan file");
//         println!("img done");
//     }

//     let foto_profile = format!("{}.png",&imagename);
//     let id = req.id.abs();
//     let nama = req.nama.to_string();
//     let tanggal_lahir = req.tanggal_lahir.to_string();
//     let nomor_telepon = req.nomor_telepon.to_string();
//     let email = req.email.to_string();
//     let semester = req.semester.to_string();
//     let pendidikan_terakhir = req.pendidikan_terakhir.to_string();
//     let username = req.username.to_string();
//     let password = req.password();
//     let _res = sqlx::query(
//         "UPDATE account SET foto_profile = $2, nama = $3, tanggal_lahir = $4,
//          nomor_telepon = $5, email = $6, pendidikan_terakhir = $7,
//          semester = $8, username = $9, password = $10
//          WHERE id = $1")
//         .bind(id)
//         .bind(foto_profile)
//         .bind(nama)
//         .bind(tanggal_lahir)
//         .bind(nomor_telepon)
//         .bind(email)
//         .bind(pendidikan_terakhir)
//         .bind(semester)
//         .bind(username)
//         .bind(password)
//         .execute(pool.get_ref())
//         .await?;

//     Ok(HttpResponse::Ok().body("Data berhasil diupdate"))
// }
