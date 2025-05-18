# config/routes.rb

Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  
  resources :customers do
    collection { post :import }
  end

  resources :messages, only: [:create]

  namespace :reports do
    get 'generate', to: 'reports#generate'
  end

  root to: 'home#index'
end