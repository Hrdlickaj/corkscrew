class CreateWines < ActiveRecord::Migration[7.0]
  def change
    create_table :wines do |t|
      t.string :name
      t.integer :vintage
      t.string :country
      t.string :region
      t.string :grape
      t.integer :rating
      t.string :image
      t.text :memory
      t.text :tasting
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
