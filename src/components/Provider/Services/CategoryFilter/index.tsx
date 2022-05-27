
import React, {useEffect, useState} from "react";
import authorizedFetch from "../../../../../utils/authorizedFetch";
import {GET_PROVIDER_SERVICES_CATEGORIES_API} from "../../../../constants";
import styles from "./index.module.css";

interface props {
  accessToken: string,
  activeCategory: string,
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryFilter: React.FC<props> = ({ accessToken, activeCategory, setActiveCategory }) => {

  const [categories, setCategories] = useState<string[]>([])
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const fetchCategories = async () => {
    const res = await authorizedFetch({
      url: GET_PROVIDER_SERVICES_CATEGORIES_API,
      method: "GET",
      accessToken: accessToken,
    });

    if (res.categories) {
      setCategories(res.categories);
      return;
    }

    setIsError(true)
    setError(res.msg)
  }

  useEffect(() => {
    fetchCategories()

    return () => {
      setCategories([])
      setIsError(false)
      setError('')
    }
  },[]);

  return (
    <div className={styles.container}>
      {
        isError && 
        <p>{error}</p>
      }
      {
        !isError && categories.length !== 0 ? 
          <>
            <div 
              className={activeCategory === 'all' ? styles.active : styles.inactive}
              onClick={() => setActiveCategory('all')}
            >
              <p>All</p>
            </div>
            {
              categories.map((category: string, idx: number) => {
                return (
                  <div 
                    className={activeCategory === category ? styles.active : styles.inactive} 
                    key={idx}
                    onClick={() => setActiveCategory(category)}
                  >
                    <p>{category}</p>
                  </div>
                )
              })
            }
          </>
          : 
          <p>No Service Categories to show yet.</p>
      }
    </div>
  );
};


export default CategoryFilter;
