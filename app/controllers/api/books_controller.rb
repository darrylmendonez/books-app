class Api::BooksController < ApplicationController
  skip_before_action :verify_authenticity_token # disables CSRF protection since React is not using Rails forms and will not generate a valid token. We are only serving JSON-only endpoints, not html views
  before_action :set_book, only: [:show, :update, :destroy] # finds the book by ID and assigns it to @book

  # GET /books
  def index
    if params[:search].present?
      books = Book.search_by_title(params[:search])
    else
      books = Book.all
    end
    render json: books
  end

  # GET /books/1
  def show
    render json: @book
  end

  # POST /books
  def create
    book = Book.new(book_params)
    if book.save
      render json: book, status: :created
    else
      render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /books/1
  def update
    if @book.update(book_params)
      render json: @book
    else
      render json: { errors: @book.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /books/1
  def destroy
    @book.destroy
    head :no_content
    rescue
      render json: { error: "Book not found"}, status: :not_found
  end

  private

    def book_params # uses strong parameters to whitelist permitted book fields
      params.require(:book).permit(:title, :author, :description)
    end

  def set_book
    @book = Book.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Book not found"}, status:  :not_found
  end

end
