class CreateFavorites < ActiveRecord::Migration[7.1]
  def change
    create_table :favorites do |t|
      t.references :user, foreign_key: true
      t.references :photo, foreign_key: true
      t.timestamps
    end
    add_index :favorites, [:user_id, :photo_id], unique: true
  end
end
