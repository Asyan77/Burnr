Rails.application.routes.draw do
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index, :show]
    resources :photos
    resources :comments
    resources :favorites, only: [:create, :show, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end

  get '*path',
    to: 'static_pages#frontend',
    constraints: lambda { |req| !req.xhr? && req.format.html? }

  root 'static_pages#frontend', 
    constraints: lambda { |req| !req.xhr? && req.format.html? }
end
