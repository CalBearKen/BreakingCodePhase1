# app/models/customer.rb

class Customer < ApplicationRecord
  validates :name, :email, presence: true
end