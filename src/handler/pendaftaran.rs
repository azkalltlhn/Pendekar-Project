use actix_web::{get, post, delete, web, Responder};
use actix_web_lab::extract::Path;
use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use crate::app::Result;

pub fn services() -> actix_web::Scope {
    web::scope("/daftar")
        .service(all)
        .service(create)
        // .service(update)
        .service(delete)
        .service(check)
        .service(delete_by_ref)
}

#[derive(Serialize, Deserialize, sqlx::FromRow)]
pub struct Daftar {
    id: i16,
    id_user: i32, // utk id account
    id_event: Option<i32>,
    id_beasiswa: Option<i32>,
    id_lowongan: Option<i32>,
    created: NaiveDateTime
}

#[get("/query/{id_user}")]
async fn all(pool: web::Data<PgPool>, Path(id_user): Path<i16>) -> Result<impl Responder> {
    let daftar: Vec<Daftar> = sqlx::query_as::<_, Daftar>(
        "SELECT id, id_user, id_event, id_beasiswa, id_lowongan, created FROM pendaftaran WHERE id_user = $1",
    )
    .bind(id_user)
    .fetch_all(pool.get_ref())
    .await?;

    Ok(web::Json(daftar))
}

#[derive(Deserialize)]
pub struct CreateDaftar {
    id_user: i16,
    id_event: Option<i16>,
    id_beasiswa: Option<i16>,
    id_lowongan: Option<i16>,
}

#[post("/create")]
async fn create(pool: web::Data<PgPool>, daftar: web::Json<CreateDaftar>) -> Result<impl Responder> {
    let daftar = daftar.into_inner();
    
    sqlx::query(
        "INSERT INTO pendaftaran (id_user, id_event, id_beasiswa, id_lowongan) VALUES ($1, $2, $3, $4)",
    )
    .bind(daftar.id_user)
    .bind(daftar.id_event)
    .bind(daftar.id_beasiswa)
    .bind(daftar.id_lowongan)
    .execute(pool.get_ref())
    .await?;

    Ok(web::Json("Berhasil Daftar Kegiatan."))
}

#[post("/check")]
async fn check(pool: web::Data<PgPool>, daftar: web::Json<CreateDaftar>) -> Result<impl Responder> {
    let daftar = daftar.into_inner();
    
    let result = sqlx::query(
        "SELECT id, id_user, id_event, id_beasiswa, id_lowongan FROM pendaftaran WHERE id_user = $1 
        AND (id_event = $2 OR id_event IS NULL)
        AND (id_beasiswa = $3 OR id_beasiswa IS NULL)
        AND (id_lowongan = $4 OR id_lowongan IS NULL)",
    )
    .bind(daftar.id_user)
    .bind(daftar.id_event)
    .bind(daftar.id_beasiswa)
    .bind(daftar.id_lowongan)
    .fetch_optional(pool.get_ref())
    .await?;
    if result.is_none() {
        Ok(web::Json(false))
    } else {
        Ok(web::Json(true))
    }
}

#[derive(Deserialize)]
pub struct DeleteDaftar {
    id: i16,
}

#[delete("/delete/{id}")]
async fn delete(pool: web::Data<PgPool>, Path(id): Path<i16>) -> Result<impl Responder> {
    sqlx::query("DELETE FROM pendaftaran WHERE id = $1")
        .bind(id)
        .execute(pool.get_ref())
        .await?;

    Ok(web::Json("Berhasil berhenti mengikuti kegiatan."))
}

#[post("/deleteRef")]
async fn delete_by_ref(pool: web::Data<PgPool>, daftar: web::Json<CreateDaftar>) -> Result<impl Responder> {
    let daftar = daftar.into_inner();
    
    sqlx::query(
        "DELETE FROM pendaftaran WHERE id_user = $1 
        AND (id_event = $2 OR id_event IS NULL)
        AND (id_beasiswa = $3 OR id_beasiswa IS NULL)
        AND (id_lowongan = $4 OR id_lowongan IS NULL)",
    )
    .bind(daftar.id_user)
    .bind(daftar.id_event)
    .bind(daftar.id_beasiswa)
    .bind(daftar.id_lowongan)
    .fetch_optional(pool.get_ref())
    .await?;

    Ok(web::Json("Berhasil berhenti mengikuti kegiatan."))
}