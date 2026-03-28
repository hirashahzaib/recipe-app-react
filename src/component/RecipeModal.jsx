import React from 'react'
import { Modal } from 'react-bootstrap'

function RecipeModal({ recipe, show, setShow }) {
     if (!recipe) return null;
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  
                    <h3>{recipe.strMeal}</h3>
                    
                </Modal.Header>

                <Modal.Body>

                    <div className='d-flex justify-content-space-between'>
                        <img src={recipe.strMealThumb} alt=""
                            style={{ width: '200px', height: '200px', margin: ' 20px' }} />
                        <div>
                            <h4>Ingrediants</h4>
                            <ul>
                                {Array.from({ length: 20 }, (_, i) => {
                                    const ingredient = recipe[`strIngredient${i + 1}`];
                                    const measure = recipe[`strMeasure${i + 1}`];

                                    if (!ingredient) return null;
                                    return (
                                        <li key={i}>
                                            {ingredient} - {measure}
                                        </li>
                                    );

                                })}
                            </ul>
                        </div>



                    </div>
                    <h4 className='text-center'>Recipe</h4>
                    <p style={{ maxWidth: "350px", margin: "auto" }}>
                        {recipe.strInstructions}
                    </p>


                </Modal.Body>

            </Modal>
        </>

    )
}

export default RecipeModal