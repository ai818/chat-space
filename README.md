# README

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|
|name|string|null: false|
|email|string|unique: true|
|password|string|
|password_confirmation|string|
|timestamps|

### Association
- has_many :groups through: :members
- has_many :group_users
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|
|body|text|
|image|string|
|group_id|references|null:false, foreign_key: true|
|user_id|references|null:false, foreign_key: true|
|timestamps|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|
|name|string|null: false|

### Association
- has_many :messages
- has_many :group_users
- belongs_to :users through: :group_users

