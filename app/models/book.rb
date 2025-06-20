class Book < ApplicationRecord
  validates :title, presence: true, length: { minimum: 3 }
  validates :author, presence: true, length: { minimum: 3 }
  validates :description, length: { maximum: 500 }

  scope :search_by_title, ->(query) { where("title ILIKE ?", "%#{query.strip}%") if query.present? }
end
