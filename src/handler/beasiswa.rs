use actix_web::{get, post, put, delete, web, Responder};
use actix_web_lab::extract::Path;
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use crate::app::Result;

pub fn services() -> actix_web::Scope {
    web::scope("/beasiswa")
        .service(index)
        .service(create)
        .service(update)
        .service(delete)
        .service(all)
}

#[derive(Serialize, Deserialize, sqlx::FromRow)]
pub struct Beasiswa {
    id_beasiswa: i16,
    judul_beasiswa: String,
    poster_beasiswa: String,
    hastag_beasiswa: String,
    deskripsi_beasiswa: String,
}

#[get("/{id_beasiswa}")]
async fn index(pool: web::Data<PgPool>, Path(id_beasiswa): Path<i16>) -> Result<impl Responder> {
    let beasiswa = sqlx::query_as::<_, Beasiswa>(
        "SELECT id_beasiswa, judul_beasiswa, poster_beasiswa, hastag_beasiswa, deskripsi_beasiswa FROM beasiswa WHERE id_beasiswa = $1"
    )
    .bind(id_beasiswa)
    .fetch_one(pool.get_ref())
    .await?;

    Ok(web::Json(beasiswa))
}

#[get("/query/all")]
async fn all(pool: web::Data<PgPool>) -> Result<impl Responder> {

    let beasiswa = sqlx::query_as::<_, Beasiswa>(
        "SELECT id_beasiswa, judul_beasiswa, poster_beasiswa, hastag_beasiswa, deskripsi_beasiswa FROM beasiswa",
    )
    .fetch_all(pool.get_ref())
    .await?;

    Ok(web::Json(beasiswa))
}

#[post("/")]
async fn create(pool: web::Data<PgPool>, beasiswa: web::Json<Beasiswa>) -> Result<impl Responder> {
    let beasiswa = beasiswa.into_inner();

    let _res = sqlx::query(
        "INSERT INTO beasiswa (judul_beasiswa, poster_beasiswa, hastag_beasiswa, deskripsi_beasiswa) VALUES 
        ($1, $2, $3, $4)",
    )
    .bind(beasiswa.judul_beasiswa)
    .bind(beasiswa.poster_beasiswa)
    .bind(beasiswa.hastag_beasiswa)
    .bind(beasiswa.deskripsi_beasiswa) 
    .execute(pool.get_ref())
    .await?;

    Ok(web::Json("Data berhasil diinput"))
}

#[put("/update")]
pub async fn update(pool: web::Data<PgPool>, beasiswa: web::Json<Beasiswa>) -> Result<impl Responder> {
    let beasiswa = beasiswa.into_inner();
    let _res = sqlx::query(
        "UPDATE beasiswa SET judul_beasiswa = $2, poster_beasiswa = $3, hastag_beasiswa = $3, 
        deskripsi_beasiswa = $4 WHERE id_beasiswa = $1",
    )
        .bind(beasiswa.id_beasiswa)
        .bind(beasiswa.judul_beasiswa)
        .bind(beasiswa.poster_beasiswa)
        .bind(beasiswa.hastag_beasiswa)
        .bind(beasiswa.deskripsi_beasiswa) 
    .execute(pool.get_ref())
    .await?;

    Ok(web::Json("Data berhasil diupdate"))
}

#[delete("/{id_beasiswa}")]
pub async fn delete(
    pool: web::Data<PgPool>,
    id_beasiswa: web::Path<i16>,
) -> Result<impl Responder> {
    let id_beasiswa = id_beasiswa.into_inner();

    let _res = sqlx::query(
        "DELETE FROM beasiswa WHERE id_beasiswa = $1",
    )
    .bind(id_beasiswa)
    .execute(pool.get_ref())
    .await?;

    Ok(web::Json("Data berhasil dihapus"))
}
