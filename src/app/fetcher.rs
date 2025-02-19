use sqlx::{ Row, Column, postgres::{PgArguments, PgRow},
    Postgres, query::Query };
use std::collections::HashMap;
use serde_json::{Value, json};
use async_trait::async_trait;

#[async_trait]
pub trait Fetcher {
    async fn fetch_hash(self, pool: &sqlx::PgPool)
        -> Result<HashMap<String, Value>, sqlx::Error>;

    async fn fetch_hashes(self, pool: &sqlx::PgPool)
        -> Result<Vec<HashMap<String, Value>>, sqlx::Error>;
}

fn get_record(row: &PgRow) -> HashMap<String, Value> {
    let mut record = HashMap::new();
    for column in row.columns() {
        // println!("#{}: col type: {}", column.ordinal(), column.type_info());
        let (name, i) = (column.name().to_string(), column.ordinal());
        record.insert(name, match column.type_info().to_string().as_str() {
            "INT2" => json!( row.get::<Option<i16>, _>(i)    ),
            "INT4" => json!( row.get::<Option<i32>, _>(i)    ),
            "INT8" => json!( row.get::<Option<i64>, _>(i)    ),
            "BOOL" => json!( row.get::<Option<bool>, _>(i)   ),
            "TEXT[]" => json!( row.get::<Option<Vec<Option<String>>>, _>(i) ),
            // tipe varchar masuk/tertangkap di pilihan terakhir/default :
            _      => json!( row.get::<Option<String>, _>(i) ) });
    }
    record
}

#[async_trait]
impl Fetcher for Query<'_, Postgres, PgArguments> {
    async fn fetch_hash(self, pool: &sqlx::PgPool)
        -> Result<HashMap<String, Value>, sqlx::Error>
    {
        let row = self.fetch_one(pool) .await?;
        let map = get_record(&row);
        Ok( map )
    }

    async fn fetch_hashes(self, pool: &sqlx::PgPool)
        -> Result<Vec<HashMap<String, Value>>, sqlx::Error>
    {
        let records = self.fetch_all(pool) .await?
            .iter() .map(|row| get_record(row))
            .collect::< Vec<HashMap<String, Value>> >();
        Ok( records )
    }
}
