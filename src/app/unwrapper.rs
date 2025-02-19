use chrono::NaiveDateTime;
use serde_json::Value;
use std::collections::HashMap;
use crate::app::{Result, error::CustomError};

pub trait ValueGetter {
    fn get_value(&self, key: &str) -> Result<&Value>;
}

impl ValueGetter for Value {
    fn get_value(&self, key: &str) -> Result<&Value> {
        self.get(key) // Option<Value>
            .ok_or_else( || error(key, "invalid or not found") ) // Result<Value>
    }
}

impl ValueGetter for HashMap<String, Value> {
    fn get_value(&self, key: &str) -> Result<&Value> {
        self.get(key) // Option<Value>
            .ok_or_else( || error(key, "invalid or not found") ) // Result<Value>
    }
}

fn error(key: &str, msg: &str) -> CustomError {
    CustomError::new( 401, format!("'{key}' {msg}") )
}

pub trait Unwrapper: ValueGetter {
    // key is only for logging
    fn get_i64(&self, key: &str) -> Result<i64> {
        self.get_value(key)? .as_i64()
            .ok_or_else( || error(key, "not a number") )
    }
    fn get_i16(&self, key: &str) -> Result<i16> {
        Ok( i16::try_from(self.get_i64(key)?)? )
    }
    fn get_i32(&self, key: &str) -> Result<i32> {
        Ok( i32::try_from(self.get_i64(key)?)? )
    }
    fn get_str(&self, key: &str)     -> Result<Option<&str>> {
        Ok( self.get_value(key)?.as_str() )  // nullable
    }
    fn get_strings(&self, key: &str) -> Result<Vec<String>> {
        self.get_value(key)? // -> serde_json::Value
            .as_array() // -> Option<&Vec>
            .ok_or_else( || error(key, "not an array") )? //unwrap
            .into_iter()
            .map( |item| Ok(
                item.as_str() // -> Option<&str>
                    .ok_or_else( || error(key, "Invalid") )? //unwrap
                    .into() ) ) // -> String
            .collect::<Result<Vec<String>>>()
    }
}

impl Unwrapper for Value {}
impl Unwrapper for HashMap<String, Value> {} // for DB query result

