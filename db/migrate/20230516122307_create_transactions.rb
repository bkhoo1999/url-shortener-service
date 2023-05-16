class CreateTransactions < ActiveRecord::Migration[7.0]
  def change
    create_table :transactions do |t|
      t.string :geolocation
      t.belongs_to :link, foreign_key: true

      t.timestamps
    end
  end
end
