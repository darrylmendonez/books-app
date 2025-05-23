class Book < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true
  validates :description, length: { maximum: 500 }
end
