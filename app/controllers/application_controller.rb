class ApplicationController < ActionController::Base
  rescue_from StandardError do |e|
    render json: { error: e.message }, status: 500
    end
end
