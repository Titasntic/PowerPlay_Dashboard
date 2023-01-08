import { gql } from "@apollo/client";

//get all videos
export const ALL_VIDEOS = gql`
  query MyQuery($search: String!) {
    video_list(where: { video_title: { _ilike: $search } }) {
      created_at
      duration
      fk_sub_type_id
      id
      main_type
      package_type
      promotion
      target_period
      thumbnail_image_url
      updated_at
      video_title
      video_url_a
      video_url_b
      video_sub_type {
        id
        sub_type_name
      }
    }
  }
`;

//for sub_type_name
export const SUB_TYPE_NAME = gql`
  query MyQuery {
    video_sub_type {
      id
      sub_type_name
    }
  }
`;

//Delete Video
export const DELETE_VIDEOS_PK = gql`
  mutation MyMutation($id: uuid!) {
    delete_video_list_by_pk(id: $id) {
      id
    }
  }
`;

// Create video
export const CREATE_VIDEOS = gql`
  mutation MyMutation(
    $video_title: String!
    $main_type: String!
    $package_type: String!
    $target_period: String!
    $duration: String
    $video_url_a: String!
    $video_url_b: String!
    $thumbnail_image_url: String!
    $promotion: Boolean!
    $sub_name: uuid!
  ) {
    insert_video_list_one(
      object: {
        duration: $duration
        main_type: $main_type
        package_type: $package_type
        promotion: $promotion
        target_period: $target_period
        thumbnail_image_url: $thumbnail_image_url
        video_title: $video_title
        video_url_a: $video_url_a
        video_url_b: $video_url_b
        fk_sub_type_id: $sub_name
      }
    ) {
      created_at
      duration
      fk_sub_type_id
      id
      main_type
      package_type
      promotion
      target_period
      thumbnail_image_url
      updated_at
      video_title
      video_url_a
      video_url_b
    }
  }
`;

// update video
export const UPDATE_VIDEOS = gql`
  mutation MyMutation(
    $id: uuid!
    $video_title: String!
    $main_type: String!
    $package_type: String!
    $target_period: String!
    $duration: String
    $video_url_a: String!
    $video_url_b: String!
    $thumbnail_image_url: String!
    $promotion: Boolean!
    $sub_name: uuid!
  ) {
    update_video_list_by_pk(
      pk_columns: { id: $id }
      _set: {
        duration: $duration
        main_type: $main_type
        package_type: $package_type
        promotion: $promotion
        target_period: $target_period
        thumbnail_image_url: $thumbnail_image_url
        video_title: $video_title
        video_url_a: $video_url_a
        video_url_b: $video_url_b
        fk_sub_type_id: $sub_name
      }
    ) {
      created_at
      duration
      fk_sub_type_id
      id
      main_type
      package_type
      promotion
      target_period
      thumbnail_image_url
      updated_at
      video_title
      video_url_a
      video_url_b
    }
  }
`;

// image upload
export const GET_IMAGE_UPLOAD_URL = gql`
  mutation GET_IMAGE_UPLOAD_URL {
    getImageUploadUrl {
      error
      imageName
      imageUploadUrl
      message
    }
  }
`;

// video filter MAIN and SUB type
export const VIDEO_CATEGORY = gql`
  query VIDEO_LIST($main_type: String, $sub_type: uuid) {
    video_list(
      where: {
        _and: {
          main_type: { _eq: $main_type }
          _and: { fk_sub_type_id: { _eq: $sub_type } }
        }
      }
    ) {
      video_url_b
      video_url_a
      video_title
      video_sub_type {
        sub_type_name
      }
      thumbnail_image_url
      target_period
      promotion
      package_type
      main_type
      id
      duration
      created_at
    }
  }
`;

// video filter MAIN type
export const ALL_VIDEO_CATEGORY = gql`
  query VIDEO_LIST($main: String) {
    video_list(where: { _and: { main_type: { _eq: $main } } }) {
      created_at
      duration
      fk_sub_type_id
      id
      main_type
      package_type
      promotion
      target_period
      thumbnail_image_url
      video_sub_type {
        sub_type_name
        id
      }
      video_title
      video_url_a
      video_url_b
    }
  }
`;

export const SUB_TYPE = gql`
  query VIDEO_SUB_TYPE($sub_type: String) {
    video_sub_type(where: { _and: { sub_type_name: { _eq: $sub_type } } }) {
      id
    }
  }
`;
