

import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet,ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Dummy API functions

const fakeUserApi = {
  addUser: (userData) => {
    console.log('User added:', userData);
  },
  loginUser: (userData) => {
    console.log('User logged in:', userData);
    return true; // For simplicity, always return true
  },
};

const fakeProductApi = {
  getProducts: () => {
    return [
      { id: 1, name: 'watch', category: 'Electronic' }, 
      { id: 2, name: 'Notebooks', category: 'Stationary' },
      { id: 3, name: 'Headphone', category: 'Electronic' },
      { id: 4, name: 'Mobile', category: 'Electronic' },
      { id: 5, name: 'Pen', category: 'Stationary' },
      
      // Add more products as needed
    ];
  },
  addProduct: (productData) => {
    console.log('Product added:', productData);
  },
  editProduct: (productId, productData) => {
    console.log('Product edited:', productId, productData);
  },
  deleteProduct: (productId) => {
    console.log('Product deleted:', productId);
  },
};

// Registration and Login Components
const Registration = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const userData = { username, password };
    fakeUserApi.addUser(userData);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text>Registration Page</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const userData = { username, password };
    const isLoggedIn = fakeUserApi.loginUser(userData);
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Registration')} />
    </View>
  );
};

// Home Screen Component
const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    const allProducts = fakeProductApi.getProducts();
    setProducts(allProducts);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Button title="Add New Product" onPress={() => navigation.navigate('AddProduct')} />
      {products.map((product) => (
        <Button
          key={product.id}
          title={product.name}
          onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
        /> 
      ))}
    </View>
  );
};

// Add Product Screen Component
const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');

  const handleAddProduct = () => {
    if (productName && productCategory) {
      const newProduct = {
        id: new Date().getTime(),
        name: productName,
        category: productCategory,
      };

      fakeProductApi.addProduct(newProduct);
      setProductName('');
      setProductCategory('');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add New Product</Text>
      <TextInput
        placeholder="Product Name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Product Category"
        value={productCategory}
        onChangeText={(text) => setProductCategory(text)}
        style={styles.input}
      />
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

// Product Details Screen Component
const ProductDetails = ({ route }) => {
  const { productId } = route.params;

  const handleEditProduct = () => {
    // Implement logic to edit product details
    console.log('Edit Product:', productId);
  };

  const handleDeleteProduct = () => {
    // Implement logic to delete product
    fakeProductApi.deleteProduct(productId);
    console.log('Delete Product:', productId);
  };

  return (
    <View style={styles.container}>
      <Text>Product Details Page</Text>
      <Text>Product ID: {productId}</Text>
      <Button title="Edit" onPress={handleEditProduct} />
      <Button title="Delete" onPress={handleDeleteProduct} />
    </View>
  );
};

// Drawer Navigator
const Drawer = createDrawerNavigator();

// Main App Component
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Registration" component={Registration} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="AddProduct" component={AddProduct} />
        <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'pink',
   
  },
  input: {
    
    borderWidth: 1,
    borderColor: 'blue',
    padding: 8,
    margin: 8,
    width: '80%',
  },
 
 
});

export default App;


