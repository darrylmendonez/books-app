Rails.application.routes.draw do
  namespace :api do
    resources :books
  end
  root "home#index"
end
