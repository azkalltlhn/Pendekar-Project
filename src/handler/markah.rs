use actix_web::{get, post, delete, web, Responder};
use actix_web_lab::extract::Path;
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use crate::app::Result;

pub fn services() -> actix_web::Scope {
    web::scope("/markah")
        .service(all)
        .service(create)
        // .service(update)
        .service(delete)
        .service(check)
        .service(delete_by_ref)
}

#[derive(Serialize, Deserialize, sqlx::FromRow)]
pub struct Markah {
    id: i16,
    id_user: i32, // utk id account
    id_event: Option<i32>,
    id_beasiswa: Option<i32>,
    id_lowongan: Option<i32>,
}

#[get("/query/{id_user}")]
async fn all(pool: web::Data<PgPool>, Path(id_user): Path<i16>) -> Result<impl Responder> {
    let markah = sqlx::query_as::<_, Markah>(
        "SELECT id, id_user, id_event, id_beasiswa, id_lowongan FROM markah WHERE id_user = $1",
    )
    .bind(id_user)
    .fetch_all(pool.get_ref())
    .await?;

    Ok(web::Json(markah))
}

#[derive(Deserialize)]
pub struct CreateMarkah {
    id_user: i16,
    id_event: Option<i16>,
    id_beasiswa: Option<i16>,
    id_lowongan: Option<i16>,
}

#[post("/create")]
async fn create(pool: web::Data<PgPool>, markah: web::Json<CreateMarkah>) -> Result<impl Responder> {
    let markah = markah.into_inner();
    
    sqlx::query(
        "INSERT INTO markah (id_user, id_event, id_beasiswa, id_lowongan) VALUES ($1, $2, $3, $4)",
    )
    .bind(markah.id_user)
    .bind(markah.id_event)
    .bind(markah.id_beasiswa)
    .bind(markah.id_lowongan)
    .execute(pool.get_ref())
    .await?;

    Ok(web::Json("Berhasil menyimpan item."))
}

#[post("/check")]
async fn check(pool: web::Data<PgPool>, markah: web::Json<CreateMarkah>) -> Result<impl Responder> {
    let markah = markah.into_inner();
    
    let result = sqlx::query(
        "SELECT id, id_user, id_event, id_beasiswa, id_lowongan FROM markah WHERE id_user = $1 
        AND (id_event = $2 OR id_event IS NULL)
        AND (id_beasiswa = $3 OR id_beasiswa IS NULL)
        AND (id_lowongan = $4 OR id_lowongan IS NULL)",
    )
    .bind(markah.id_user)
    .bind(markah.id_event)
    .bind(markah.id_beasiswa)
    .bind(markah.id_lowongan)
    .fetch_optional(pool.get_ref())
    .await?;
    if result.is_none() {
        Ok(web::Json(false))
    } else {
        Ok(web::Json(true))
    }
}

#[derive(Deserialize)]
pub struct DeleteMarkah {
    id: i16,
}

#[delete("/delete/{id}")]
async fn delete(pool: web::Data<PgPool>, Path(id): Path<i16>) -> Result<impl Responder> {
    sqlx::query("DELETE FROM markah WHERE id = $1")
        .bind(id)
        .execute(pool.get_ref())
        .await?;

    Ok(web::Json("Item dihapus."))
}

#[post("/deleteRef")]
async fn delete_by_ref(pool: web::Data<PgPool>, markah: web::Json<CreateMarkah>) -> Result<impl Responder> {
    let markah = markah.into_inner();
    
    sqlx::query(
        "DELETE FROM markah WHERE id_user = $1 
        AND (id_event = $2 OR id_event IS NULL)
        AND (id_beasiswa = $3 OR id_beasiswa IS NULL)
        AND (id_lowongan = $4 OR id_lowongan IS NULL)",
    )
    .bind(markah.id_user)
    .bind(markah.id_event)
    .bind(markah.id_beasiswa)
    .bind(markah.id_lowongan)
    .fetch_optional(pool.get_ref())
    .await?;

    Ok(web::Json("Berhasil Dihapus."))
}



// #[post("/")]
// async fn create(pool: web::Data<PgPool>, markah: web::Json<Markah>) -> Result<impl Responder> {
//     let markah = markah.into_inner();
    
//     let _res = sqlx::query!(
//         "insert into markah (isi_markah) values ($1)",
//     )
//         .bind(markah.isi_markah)
//         .execute(pool.get_ref()) 
//         .await? ;

//     Ok("Data berhasil di input")
// }

// #[put("/update")]
// async fn update(
//     pool: web::Data<PgPool>,
//     markah: web::Json<Markah>,
// ) -> Result<impl Responder> {
//     let markah = markah.into_inner();
//     let _res = sqlx::query!(
//         "UPDATE markah SET isi_markah = $2 WHERE id_markah = $1",
//         markah.id_markah,
//         .username,
//         login.password,
//     )
//     .execute(pool.get_ref())
//     .await?;

//     Ok("Data berhasil di update")
// }

// #[delete("/{id_markah}")]
// pub async fn delete(pool: web::Data<PgPool>, id_markah: web::Path<i16>) -> Result<impl Responder> {
//     let id_markah = id_markah.into_inner();

//     let _res = sqlx::query(
//         "DELETE FROM markah WHERE id_markah = $1",
//     )
//     .bind(id_markah,)
//     .execute(pool.get_ref())
//     .await?;

//     Ok("Data berhasil di hapus")
// }