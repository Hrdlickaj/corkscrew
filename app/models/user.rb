class User < ApplicationRecord
    has_secure_password

    has_many :wines

    validates :username, presence: true, uniqueness: true
end
