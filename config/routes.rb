Rails.application.routes.draw do
  # root to: "static_pages#root"
  root to: "api/messages#root"
  mount ActionCable.server, at: '/cable'
  namespace :api, defaults: {format: "json"} do
    resources :users, only: [:create, :update, :destroy, :show]
    resource :session, only: [:create, :destroy, :update, :show]
    resources :channels, only: [:create, :index, :show, :destroy, :update]
    resources :messages, only: [:create, :index, :show, :update]
  end
end
