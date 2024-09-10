// sanity.js
import { createClient } from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: '0z7cm8hv',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getUsers() {
  const users = await client.fetch('*[_type == "users"]')
  return users
}

export async function createUser(post) {
  const result = client.create(post)
  return result
}

export async function updateDocumentTitle(_id, title) {
  const result = client.patch(_id).set({title})
  return result
}

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};

export const storeAssets = (file, filename = 'image.jpg') => {
  client.assets.upload('image', file, {
    filename
  })
  .then((imageAsset) => {
    return imageAsset
  })
  .catch((err) => {
    console.error('Image Failed Upload', err.messasge)
  })
}