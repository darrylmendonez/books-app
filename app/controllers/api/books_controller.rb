class Api::BooksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action only: [:show, :update, :destroy]

  # GET /books
  def index
    books = Book.all
    render json: books
  end

  # GET /books/1
  def show
    @books = Book.all
    respond_to? do |format|
      format.html
      format.json {render json: @books}
    end
  end

  # POST /books
  def create
    book = Book.new
    if book.save
      render json: book, status: :created
    else
      render json: book.errors, status: unprocessable_entity
    end
  end

  # PATCH/PUT /books/1
  def update
    book = Book.find(params[:id])
    if book.update(book_params)
      render json: book
    else
      render json: { errors: book.errors.full_messages }, status: unprocessable_entity
    end
  end

  # DELETE /books/1
  def destroy
    @book = Book.find(params[:id])
    @book.destroy
    head :no_content
    rescue
      render json: { error: "Book not found"}, status: :not_found
  end

  private

    def book_params
      params.require(:book).permit(:title, :author, :description)
    end

end
