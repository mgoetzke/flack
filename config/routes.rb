Rails.application.routes.draw do
  root to: "static_pages#root"
  mount ActionCable.server, at: '/cable'
  namespace :api, defaults: {format: "json"} do
    resources :users, only: [:create, :index, :update, :destroy, :show]
    resource :session, only: [:create, :destroy, :update, :show]
    resources :channels, only: [:create, :index, :show, :destroy, :update] 
    resources :messages, only: [:create, :index, :show, :update]
    resources :memberships, only: [:create, :index, :destroy, :show]
  end
end
