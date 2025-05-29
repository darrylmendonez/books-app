class Book < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true
  validates :description, length: { maximum: 500 }

  scope :search_by_title, ->(query) { where("title ILIKE ?", "%#{query.strip}%") if query.present? }
end
