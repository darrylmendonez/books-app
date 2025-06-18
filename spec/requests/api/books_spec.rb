require 'rails_helper'

RSpec.describe "Books API", type: :request do
  describe "GET /api/books" do
    before do
      Book.create!(title: "Book A", author: "Author A")
      Book.create!(title: "Book B", author: "Author B")
    end

    it "returns a list of books" do
      get "/api/books"
      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json.length).to eq(2)
      expect(json.first["title"]).to eq("Book A")
    end
  end

  describe "GET /api/books/:id" do
    let!(:book) { Book.create!(title: "Dune", author: "Frank Herbert") }

    it "returns the book details" do
      get "/api/books/#{book.id}"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json["title"]).to eq("Dune")
      expect(json["author"]).to eq("Frank Herbert")
    end

    it "returns 404 if the book is not found" do
      get "/api/books/999999" # unlikely to exist

      expect(response).to have_http_status(:not_found)

      json = JSON.parse(response.body)
      expect(json["error"]).to eq("Book not found")
    end
  end

  describe "POST /api/books" do
    let(:valid_attributes) do
      {
        book: {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          description: "A fantasy adventure"
        }
      }
    end

    let(:invalid_attributes) do
      {
        book: {
          title: "",
          author: "AB"
        }
      }
    end

    it "creates a new book with valid attributes" do
      expect {
        post "/api/books", params: valid_attributes
      }.to change(Book, :count).by(1)

      expect(response).to have_http_status(:created)

      json = JSON.parse(response.body)
      expect(json["title"]).to eq("The Hobbit")
      expect(json["author"]).to eq("J.R.R. Tolkien")
    end

    it "does not create a book with invalid attributes" do
      expect {
        post "/api/books", params: invalid_attributes
      }.not_to change(Book, :count)

      expect(response).to have_http_status(:unprocessable_entity)

      json = JSON.parse(response.body)
      expect(json["errors"]["title"]).to include("can't be blank").or include("is too short")
      expect(json["errors"]["author"]).to include("is too short (minimum is 3 characters)")
    end
  end

  describe "PATCH /api/books/:id" do
    let!(:book) { Book.create!(title: "Old Title", author: "Old Author") }

    let(:valid_update) do
      {
        book: {
          title: "New Title",
          author: "New Author"
        }
      }
    end

    let(:invalid_update) do
      {
        book: {
          title: "A", # too short
          author: "" # blank
        }
      }
    end

    it "updates the book with valid attributes" do
      patch "/api/books/#{book.id}", params: valid_update

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json["title"]).to eq("New Title")
      expect(json["author"]).to eq("New Author")

      book.reload
      expect(book.title).to eq("New Title")
    end

    it "does not update the book with invalid attributes" do
      patch "/api/books/#{book.id}", params: invalid_update

      expect(response).to have_http_status(:unprocessable_entity)

      json = JSON.parse(response.body)
      expect(json["errors"]["title"]).not_to be_empty
      expect(json["errors"]["author"]).not_to be_empty

      book.reload
      expect(book.title).to eq("Old Title") # unchanged
    end
  end
end
