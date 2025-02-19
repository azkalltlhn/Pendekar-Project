use actix_web::{get, post, put, delete, web, Responder};
use actix_web_lab::extract::Path;
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use crate::app::Result;

pub fn services() -> actix_web::Scope {
    web::scope("/lowongankerja")
        .service(index)
        .service(create)
        .service(update)
        .service(delete)
        .service(all)
}

#[derive(Serialize, Deserialize, sqlx::FromRow)]
pub struct Lowongankerja {
    id_lowongan: i16,
    judul_lowongan: String,
    role: String,
    perusaahan: String,
    lokasi: String,
    deskripsi_lowongan: String,
}

#[get("/{id_lowongan}")]
async fn index(pool: web::Data<PgPool>, Path(id_lowongan): Path<i16>) -> Result<impl Responder> {
        let lowongankerja = sqlx::query_as::<_, Lowongankerja>(
        "SELECT id_lowongan, judul_lowongan, role, perusaahan, lokasi, deskripsi_lowongan 
        FROM lowongan_kerja WHERE id_lowongan = $1"
    )
    .bind(id_lowongan)
    .fetch_one(pool.get_ref())
    .await?;

    Ok(web::Json(lowongankerja))
}

#[get("/query/all")]
async fn all(pool: web::Data<PgPool>) -> Result<impl Responder> {

    let lowongankerja = sqlx::query_as::<_, Lowongankerja>(
        "SELECT id_lowongan, judul_lowongan, role, perusaahan, lokasi, deskripsi_lowongan
        FROM lowongan_kerja",
    )
    .fetch_all(pool.get_ref())
    .await?;

    Ok(web::Json(lowongankerja))
}

#[post("/")]
async fn create(pool: web::Data<PgPool>, lowongankerja: web::Json<Lowongankerja>) -> Result<impl Responder> {
    let lowongankerja = lowongankerja.into_inner();

    let _res = sqlx::query(
        "INSERT INTO lowongan_kerja (judul_lowongan, role, perusaahan, lokasi, deskripsi_lowongan) VALUES 
        ($1, $2, $3, $4, $5)",
    )
    .bind(lowongankerja.judul_lowongan)
    .bind(lowongankerja.role)
    .bind(lowongankerja.perusaahan)
    .bind(lowongankerja.lokasi)
    .bind(lowongankerja.deskripsi_lowongan) 
    .execute(pool.get_ref())
    .await?;

    Ok(web::Json("Data berhasil diinput"))
}


#[put("/update")]
async fn update(pool: web::Data<PgPool>, lowongankerja: web::Json<Lowongankerja>) -> Result<impl Responder> {
    let lowongankerja = lowongankerja.into_inner();
    let _res = sqlx::query(
        "UPDATE lowongan_kerja SET judul_lowongan = $2, role = $3, perusaahan = $4,
        lokasi = $5, deskripsi_lowongan = $6 WHERE id_lowongan = $1",
    )
    .bind(lowongankerja.id_lowongan)
    .bind(lowongankerja.judul_lowongan)
    .bind(lowongankerja.role)
    .bind(lowongankerja.perusaahan)
    .bind(lowongankerja.lokasi)
    .bind(lowongankerja.deskripsi_lowongan)
    
    .execute(pool.get_ref())
    .await?;

    Ok("Data berhasil diupdate")
}

#[delete("/{id_lowongan}")]
pub async fn delete(pool: web::Data<PgPool>, id_lowongan: web::Path<i16>,
    ) -> Result<impl Responder> {
    let id_lowongan = id_lowongan.into_inner();

    let _res = sqlx::query(
        "DELETE FROM lowongan_kerja WHERE id_lowongan = $1",
    )
    .bind(id_lowongan)
    .execute(pool.get_ref())
    .await?;

    Ok("Data berhasil dihapus")
}
