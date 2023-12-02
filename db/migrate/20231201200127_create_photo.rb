class CreatePhoto < ActiveRecord::Migration[7.1]
  def change
    create_table :photos do |t|
      t.string :title, null: false
      t.references :user, foreign_key: true
      t.text :description
      t.string :tag
      t.timestamps
    end
  end
end
