use std::{fmt, num::TryFromIntError};
use actix_web::error::HttpError;
use chrono::format::ParseError as ChronoParseError;

// semacam tipe error yg generic : CustomError
#[derive(Debug, serde::Deserialize)]
pub struct CustomError {
    pub error_status_code: u16,
    pub error_message: String,
}

impl CustomError {
    pub fn new(error_status_code: u16, error_message: String) -> CustomError {
        log::error!("{}", error_message);
        CustomError {
            error_status_code,
            error_message: "Internal Server Error".into(),
        }
    }
    pub fn from_parse_error(error: ChronoParseError) -> CustomError {
        CustomError::new(400, format!("Invalid date and time format: {}", error))
    }
}

impl fmt::Display for CustomError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        f.write_str(self.error_message.as_str())
    }
}

impl From<sqlx::Error> for CustomError {
    fn from(error: sqlx::Error) -> CustomError {
        CustomError::new(500, format!("SQLx error: {}", error))
    }
}

impl From<std::io::Error> for CustomError {
    fn from(error: std::io::Error) -> CustomError {
        CustomError::new(500, format!("std io error: {}", error))
    }
}

impl From<HttpError> for CustomError {
    fn from(error: HttpError) -> CustomError {
        CustomError::new(500, format!("Http Error: {}", error))
    }
}

impl From<TryFromIntError> for CustomError {
    fn from(error: TryFromIntError) -> CustomError {
        CustomError::new(500, format!("TryFromInt Error: {}", error))
    }
}

impl actix_web::ResponseError for CustomError {} // <-- key

