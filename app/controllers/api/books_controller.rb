module Api
  class BooksController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_book, only: %i[ show edit update destroy ]

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
      book = Book.new(book_params)
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
      book = Book.find(params[:id])
      book.destroy
      head :no_content
    end

    private

      def book_params
        params.require(:book).permit(:title, :author, :description)
      end

  end
end
