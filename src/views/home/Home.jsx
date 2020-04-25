import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from 'selectors/selector';

import ProductList from 'components/product/ProductList';
import ProductItem from 'components/product/ProductItem';
import ProductAppliedFilters from 'components/product/ProductAppliedFilters';
import Modal from 'components/ui/Modal';
import Boundary from 'components/ui/Boundary';
import ProductModalDetails from 'components/product/ProductModalDetails';
import Header from './Header';

const Home = (props) => {
  const [isOpenModal, setModalOpen] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const [columnCount, setColumnCount] = useState(6);

  const { store } = useSelector(state => ({
    store: {
      productsLength: state.products.items.length,
      products: state.products.items,
      filter: state.filter,
      basket: state.basket,
      lastRefKey: state.products.lastRefKey,
      totalItems: state.products.total,
      isLoading: state.app.loading,
      filteredProducts: selectFilter(state.products.items, state.filter),
      requestStatus: state.app.requestStatus
    }
  }));

  useEffect(() => {
    onProductsLengthChanged();
    // console.log(store.filteredProducts);
    // console.log(store.filteredProducts.length);
  }, [store.filteredProducts]);

  const dispatch = useDispatch();
  const productListWrapper = useRef(null);

  const onProductsLengthChanged = () => {
    const width = window.screen.width - 250; // minus 250px padding

    setColumnCount(Math.floor(width / 160));
    if ((columnCount >= store.filteredProducts.length) && store.filteredProducts.length !== 0) {
      setColumnCount(store.filteredProducts.length);
    }
  };

  const onClickProduct = product => setProductSelected(product);
  const foundOnBasket = id => !!store.basket.find(item => item.id === id);
  const onOpenModal = () => setModalOpen(true);
  const onCloseModal = () => setModalOpen(false);
  
  return (
    <>
      <section className="product-list-wrapper">
        {!store.requestStatus && (
          <div className="product-list-header">
            <Header
                dispatch={dispatch}
                filter={store.filter}
                filteredProductsLength={store.filteredProducts.length}
                isLoading={store.isLoading}
                products={store.products}
                productsLength={store.productsLength}
            />
          </div>
        )}
        <ProductAppliedFilters filter={store.filter}/>
        <Boundary>
          <ProductList
              dispatch={dispatch}
              filteredProductsLength={store.filteredProducts.length}
              foundOnBasket={foundOnBasket}
              isLoading={store.isLoading}
              lastRefKey={store.lastRefKey}
              productsLength={store.productsLength}
              requestStatus={store.requestStatus}
              totalItems={store.totalItems}
          >
            <Modal isOpen={isOpenModal}
                onRequestClose={onCloseModal}
            >
              <ProductModalDetails
                  dispatch={dispatch}
                  foundOnBasket={foundOnBasket}
                  product={productSelected}
              />
              <button
                  className="modal-close-button button-muted button-small"
                  onClick={onCloseModal}
              >
                X
              </button>
            </Modal>
            <div
                className="product-list"
                ref={productListWrapper}
                style={{ gridTemplateColumns: `repeat(${columnCount}, 160px)` }}
            >
              {store.filteredProducts.length === 0 ? new Array(14).fill({}).map((product, index) => (
                <ProductItem
                    foundOnBasket={foundOnBasket}
                    key={`product-skeleton ${index}`}
                    product={product}
                />
              )) : store.filteredProducts.map(product => (
                <ProductItem
                    dispatch={dispatch}
                    foundOnBasket={foundOnBasket}
                    key={product.id}
                    onClickProduct={onClickProduct}
                    onOpenModal={onOpenModal}
                    product={product}
                />
              ))}
            </div>
          </ProductList>
        </Boundary>
      </section>
    </>
  );
};

export default Home;
