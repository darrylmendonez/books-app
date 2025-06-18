require 'rails_helper'

RSpec.describe Book, type: :model do
  it "is valid with valid attributes" do
    book = Book.new(title: "1984", author: "George Orwell", description: "Dystopian novel")
    expect(book).to  be_valid
  end

  it "is invalid without a title" do
    book = Book.new(author: "George Orwell")
    expect(book).not_to be_valid
    expect(book.errors[:title]).to include("can't be blank")
  end

  it "is invalid without an author" do
    book = Book.new(title: "1984")
    expect(book).not_to be_valid
    expect(book.errors[:author]).to include("can't be blank")
  end

  it "is invalid if the title is shorter than 3 characters" do
    book = Book.new(title: "It", author: "Stephen King")
    expect(book).not_to be_valid
    expect(book.errors[:title]).to include("is too short (minimum is 3 characters)")
  end

  it "is invalid if the author is shorter than 3 characters" do
    book = Book.new(title: "Everything I Never Told You", author: "Ng")
    expect(book).not_to be_valid
    expect(book.errors[:author]).to include("is too short (minimum is 3 characters)")
  end

  it "is valid if the title is exactly 3 characters" do
    book = Book.new(title: "War", author: "John Doe")
    expect(book).to be_valid
  end

  it "is valid if the author is exactly 3 characters" do
    book = Book.new(title: "Brave New World", author: "Joe")
    expect(book).to be_valid
  end

  it "is valid without a description" do
    book = Book.new(title: "1984", author: "George Orwell", description: nil)
    expect(book).to be_valid
  end

  it "is valid with an empty description string" do
    book = Book.new(title: "1984", author: "George Orwell", description: "")
    expect(book).to be_valid
  end
end
