Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :links, param: :url_slug
  end
  
  get '/', to: 'home#index', via: :all
  get '/:url_slug', to: 'api/links#track_link'
end
