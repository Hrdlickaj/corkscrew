# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_27_183315) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "joins", force: :cascade do |t|
    t.bigint "wine_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tag_id"], name: "index_joins_on_tag_id"
    t.index ["wine_id"], name: "index_joins_on_wine_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.text "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "wines", force: :cascade do |t|
    t.string "name"
    t.integer "vintage"
    t.string "country"
    t.string "region"
    t.string "grape"
    t.integer "rating"
    t.string "image"
    t.text "memory"
    t.text "tasting"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_wines_on_user_id"
  end

  add_foreign_key "joins", "tags"
  add_foreign_key "joins", "wines"
  add_foreign_key "wines", "users"
end
