use log::LevelFilter;
use chrono::{Local, ParseError as ChronoParseError};
use std::{io::Write, result};

pub mod error;
pub mod auth;
pub mod fetcher;
pub mod unwrapper;

use self::error::CustomError;
pub use self::{fetcher::Fetcher, unwrapper::Unwrapper};

pub type Result<T> = result::Result<T, error::CustomError>;

pub struct MyResult<T>(result::Result<T, CustomError>);

impl<T> MyResult<T> {
    // Create a new MyResult instance from a result::Result<T, ChronoParseError>
    pub fn from_result_with_parse_error(result: result::Result<T, ChronoParseError>) -> Self {
        match result {
            Ok(value) => MyResult(Ok(value)),
            Err(parse_error) => MyResult(Err(CustomError::from_parse_error(parse_error))),
        }
    }

    // Access the underlying result::Result
    pub fn into_inner(self) -> result::Result<T, CustomError> {
        self.0
    }
}

// ini utk inisialisasi logger saja
pub fn init_logger() {
    env_logger::Builder::new()
        .format(|buf, record| {
            writeln!(buf,
                     "{} [{}] - {}",
                     Local::now().format("%Y-%m-%d %H:%M:%S.%3f"),
                     record.level(),
                     record.args()
            )
        })
        .filter(None, LevelFilter::Info)
        .filter(Some("sqlx"), LevelFilter::Warn)
        .init();
}