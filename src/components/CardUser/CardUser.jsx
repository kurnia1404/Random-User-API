import React from 'react';
import styles from './CardUser.module.css';

import { urlFor } from '../../sanity';

function CardUser({ user }) {
  if (!user) {
    return null;
  }
  const { noid, name, gender, image } = user;
//   const { country, city, state, postcode, street } = location || {};

  return (
    <div className={styles.cardUser}>
      <p className={styles.description}>
        {noid} - {name}
        
      </p>
      <div className={styles.imageContainer}>
        <img
          src={urlFor(image)}
          alt={name}
          height={100}
          width={'auto'}
          className={styles.image}
        />
      </div>
      <h6>
        {gender}
      </h6>
    </div>
  );
}

export default CardUser;
