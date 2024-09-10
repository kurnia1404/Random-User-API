import React, { useReducer } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { createUser, getUsers } from '../sanity';
import { urlFor } from '../sanity';
import CardUser from '../components/CardUser/CardUser';
import styles from './SampleSanity.module.css';
import { storeAssets } from '../sanity';


// function SampleSanity() {
//   const callRandomUsersAPIAxios = async () => {
//     const response = await axios('https://0z7cm8hv.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%27users%27%5D');
//     // setUsers(response?.data?.results);
//     return response?.data?.results;
//   }

//   // console.log(process.env.SANITY_SECRET_TOKEN, 'token')
//   const { data, refetch, isFetching } = useQuery(['users'], getUsers);
//   // console.log(data, 'data')

//   const [localState, updateLocalState] = useReducer (
//     (prev, next) => {
//     return {...prev, ...next}    
//     },
//     {
//       id: '', 
//       name: '', 
//       gender: '', 
//       image: null,
//       loadingCreateUser: false,
//     }  
//   )

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   createUsers ({
//   //     _type: 'users',
//   //     id: localState.id,
//   //     name: localState.name,
//   //     gender: localState.gender,
//   //     image: urlFor(localState.image)
//   //   })
    
//   }

function SampleSanity() {
  const { data, refetch, isFetching } = useQuery(['users'], getUsers);

  const [localState, updateLocalState] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      noid: '',
      name: '',
      gender: '',
      image: null,
      loadingCreateUser: false,
    }
  );
  const createUserWithImage = async () => {
    updateLocalState({ loadingCreateUser: true });
    const asset = await storeAssets(localState.image);
    await createUser({
      _type: 'users',
      noid: localState.noid,
      name: localState.name,
      gender: localState.gender,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
    })
      .then(() => {
        refetch();
      })
      .finally(() => {
        updateLocalState({ loadingCreateUser: false });
      });
  };

  const handleImageChange = (evt) => {
    const files = evt.target.files[0];

    // console.log(files, 'file')
    updateLocalState({image: files[0]});
  }

  return (
    <div className={styles.SampleSanity}>
      <h1>Users Sanity</h1>
      <form className={styles.form}>
        <h3>Create User</h3>
        <div className={styles.rowField}>
          <label htmlFor='noid'>No id:</label>
          <input
            id='noid'
            type='number'
            value={localState.noid}
            placeholder='id'
            onChange={(e) => updateLocalState({ noid: e.target.value })}
          />
        </div>
        <div className={styles.rowField}>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            type='text'
            value={localState.name}
            placeholder='Name'
            onChange={(e) => updateLocalState({ name: e.target.value })}
          />
        </div>

        <div className={styles.rowField}>
          <label htmlFor='gender'>Gender:</label>
          <input
            type='text'
            placeholder='Gender'
            value={localState.gender}
            onChange={(e) => updateLocalState({ gender: e.target.value })}
          />
        </div> 

        <div className={styles.flexCenter}>
          <label htmlFor='image'>Image:</label>
          <div className={styles.flexColumn}>
            {localState.image && (
              <img
                src={URL.createObjectURL(localState.image)}
                alt={localState.image.name}
                height={100}
                width={'auto'}
              />
            )}
            <input
              id='image'
              type='file'
              onChange={handleImageChange}
              placeholder='Image'
            />
          </div>
        </div>

        <button
          type='button'
          onClick={createUserWithImage}
          disabled={isFetching || localState.loadingCreateUser}
        >
          {(isFetching || localState.loadingCreateUser) && (
            <i className='fas fa-spinner fa-spin'></i>
          )}
          Create User
        </button>
        
      
      </form>
      <div className={styles.containerUsers}>
        {data?.map((user) => (
          <CardUser key={user.noid} user={user} />
            )
          )
        }

      
        </div>
    </div>



    // ---------------- Container ----------------------------------
    // <div className={styles.containerUsers}>
    //     {data?.map((user) => (
    //       <div className={styles.cardUser}>
    //         <h5>
    //           {user.id} - {user.name} - {user.gender}
    //         </h5>
    //         <div className={styles.imageContainer}>
    //           {user?.image && (
    //             <img
    //               src={urlFor(user?.image)}
    //               alt={user.name}
    //               height={100}
    //               width={'auto'}
    //               className={styles.image}
    //             />
    //           )}
    //         </div>
    //       </div>
    //     ))}
    //   </div>
  )
  
}

export default SampleSanity
