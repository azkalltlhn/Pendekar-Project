use actix_files as fs;

use actix_web::{HttpServer, App, web, middleware, http};
use sqlx::postgres::PgPoolOptions;
use actix_web_lab::middleware::from_fn;
use actix_cors::Cors;
use actix_multipart::form::MultipartFormConfig;

mod app;
mod handler;

#[actix_web::main]
async fn main() -> Result<(), app::error::CustomError> { 
    
    app::init_logger();

    // mempersiapkan/membuat koneksi ke database
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(env!("DATABASE_URL")).await?;

    HttpServer::new(move || {
        let multipart_config = MultipartFormConfig::default()
            .total_limit(62914560);

            let image_dir = "./src/img";

        App::new()
            .service(fs::Files::new("/images", image_dir).show_files_listing())
            .app_data(multipart_config)
            .wrap(middleware::Logger::default())
            .wrap(from_fn(app::auth::login_mw))
            .app_data(web::Data::new(pool.clone()))
            .wrap(Cors::default()
            .allowed_origin("http://localhost:8005")
            // .allowed_origin("http://localhost:5173")
            .supports_credentials()
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600))
            .service( app::auth::login )
            .service( handler::services() )
        })
        .bind("127.0.0.1:8090")?
        .run()
        .await?;

    Ok(())
}
