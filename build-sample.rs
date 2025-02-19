fn main() {
    println!("cargo:rustc-env=DATABASE_URL=postgres://postgres:postgres@localhost/pendekar");
}
