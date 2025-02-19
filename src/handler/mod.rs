use actix_web::web;

pub mod account;
pub mod event;
pub mod beasiswa;
pub mod lowongankerja;
pub mod markah;
pub mod pendaftaran;

pub fn services() -> actix_web::Scope {
    web::scope("")
        .service( account       ::services() )
        .service( event         ::services() )
        .service( beasiswa      ::services() )
        .service( lowongankerja ::services() )
        .service( markah        ::services() )   
        .service( pendaftaran   ::services() )
}