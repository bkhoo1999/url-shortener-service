class CreateLinks < ActiveRecord::Migration[7.0]
  def change
    create_table :links do |t|
      t.string :original_url
      t.string :short_url
      t.string :url_slug
      t.integer :clicks, default: 0, null: false
      t.string :title
      
      t.timestamps
    end
  end
end
