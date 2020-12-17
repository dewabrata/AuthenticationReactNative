import React from 'react';
import {
	Alert,
	FlatList,
	Modal,
	Image,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	
} from 'react-native';

import { Wrapper, Header, Left, Right, Container, Space, Row, Column, H1, H2, Footer, FloatingLabelInput, Picker, Btn, IconBtn } from '../utils';
import sample_data from '../../sample_data';

import ProductListItem from '../reuse/ProductListItem';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { RNCamera } from 'react-native-camera';


const PendingView = () => (
	<View
	 
	>
	
	</View>
  );

class Addproduct extends React.Component {

	/*
    
	 "name": "T-Shirt 0xx Small Size nala box",
			   "sku": "SKU001",
			   "images": [
				   "http://intelvue.com/demo/app-template/light/p1.png",
				   "http://intelvue.com/demo/app-template/light/p2.png"
			   ],
			   "price": "$200",
			   "id": 1,
			   "rating": 3,
			   "brand_name": "My Brand",
			   "description": "<h3>Full Description</h3><p>Nice Dude</p>",
			   "specification": "<p>I am specs</p>"
	   */

	state = {
		showAddressModal: false,
		id: "",
		name: "",
		rating: "",
		price: "",
		description: null,
		specification: "",
		brand_name: "",
		images: "",
		key: "",
		listData: [],
		isEdit: false,
		camera_capture : ""

	}



	_keyExtractor = (item, index) => item.id;

	inputs = {};

	componentDidMount() {

		database()
			.ref('Product/')
			.on('value', snapshot => {
				//console.log('User data: ', this.snapshotToArray(snapshot.val()));
				if (snapshot.val() !== null) {
					this.setState({ listData: this.snapshotToArray(snapshot.val()) })
				}
				console.log(this.state.listData);
			});



	}





	focusNextField(field) {
		if (inputs[field] !== undefined) {
			inputs[field].focus();
		}
	}


	snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { key: e[0] }));




	render() {



		return (


			<>
				<H1>Tambah Data Barang</H1>

				<FlatList
					data={this.state.listData}
					keyExtractor={(item) => item.key.toString()}
					extraData={this.state}

					renderItem={({ item, index }) => <ProductListItem item={item} onPress={() => {
						this.setState({
							id: item.id,
							name: item.name,
							rating: item.rating,
							price: item.price,
							description: item.description,
							specification: item.specification,
							brand_name: item.brand_name,
							images: item.images,
							key: item.key

						})
						this.dummyImagesTest = item.key
						this.setState({ showAddressModal: true })
						this.setState({ isEdit: true })
						
					
					}
					} />}
				/>

				<Btn label="Add Data" onPress={() => {
				   
					this.setState({ showAddressModal: true })
					this.setState({ isEdit: false })
				}} />

				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.showAddressModal}
				>
					{this._renderProduct()}
				</Modal>
			</>


		)
	}


	_renderProduct() {
		return (
			<Wrapper>
				<Header>
					<Left>
						<IconBtn icon={'x'}
							onPress={() => this.setState({
								showAddressModal: false,
								id: "",
								name: "",
								rating: "",
								price: "",
								description: null,
								specification: "",
								brand_name: "",
								images: "",
								camera_capture:""
							})}
							style={{ marginLeft: -10 }}
						/>
					</Left>
				</Header>

				<Container>

					<H2>Add New Product</H2>

					<FloatingLabelInput
						label="Name Product"
						onChangeText={(text) => this.setState({ name: text })}
						returnKeyType={"next"}
						value={this.state.name}
						ref={input => {
							this.inputs['name'] = input;
						}}
						onSubmitEditing={() => {
							this.focusNextField('price');
						}}
					/>

					<FloatingLabelInput
						label="Harga"
						onChangeText={(text) => this.setState({ price: text })}
						returnKeyType={"next"}
						value={this.state.price}
						returnKeyType={"next"}
						ref={input => {
							this.inputs['price'] = input;
						}}
						onSubmitEditing={() => {
							this.focusNextField('description');
						}}
					/>

					<FloatingLabelInput
						label="Deskripsi Product"
						onChangeText={(text) => this.setState({ description: text })}
						returnKeyType={"next"}
						value={this.state.description}
						returnKeyType={"next"}
						ref={input => {
							this.inputs['description'] = input;
						}}
						onSubmitEditing={() => {
							this.focusNextField('spesification');
						}}
					/>

					<FloatingLabelInput
						label="Spesifikasi Produk"
						onChangeText={(text) => this.setState({ specification: text })}
						returnKeyType={"next"}
						value={this.state.specification}
						returnKeyType={"next"}
						ref={input => {
							this.inputs['specification'] = input;
						}}
						onSubmitEditing={() => {
							this.focusNextField('rating');
						}}
					/>
					

					<FloatingLabelInput
						label="Rating"
						onChangeText={(text) => this.setState({ rating: text })}
						value={this.state.rating}
						returnKeyType={"next"}
						ref={input => {
							this.inputs['rating'] = input;
						}}
						onSubmitEditing={() => {
							this.focusNextField('brand_name');
						}}
					/>

					<FloatingLabelInput
						label="Brand Name"
						onChangeText={(text) => this.setState({ brand_name: text })}
						value={this.state.brand_name}
						returnKeyType={"next"}
						ref={input => {
							this.inputs['brand_name'] = input;
						}}
						onSubmitEditing={() => {
							this.addProduct()
						}}
					/>
			<Space/>
					<Row>
						<Column>
						
							<RNCamera
		   
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
          this.camera = camera;
		  if (status !== 'READY') {return <PendingView />
		  }else{
		  return (
			<View  style={styles.capture}>
			  
			</View>
		  );
		  }
          }}
          
        </RNCamera>
						</Column>

						<Column>
					       <Btn label = "Ambil Gambar"  onPress={() => this.takePicture(this.camera)} />
						</Column>
					</Row>
				
					<Space/>
					
					<Image	source = {{uri:this.state.images}} style={{ width: 300, height: 400 }}/>

					<Space />

					{this.addOrEdit()}
					

				</Container>

			</Wrapper>
		);
	}
	
	

	
	uploadFile = async () =>{
	
	
	try{
	    let filename = this.state.camera_capture.substring(this.state.camera_capture.lastIndexOf('/')+1);
		console.log(filename);
		const imagereference =  storage().ref(filename)
        
			await imagereference.putFile(this.state.camera_capture);
			const downloadURL = await  imagereference.getDownloadURL();
			this.setState({images:downloadURL})
			
	}catch(e){
	console.log(e);
	}
	
	
	if (this.state.isEdit) {
		
		this.editProduct()
		
	}else{
	
	
	    this.addProduct();
	
	}
		 
	
	
	
	
	}
	
	takePicture = async function(camera) {
	try{
		const options = { quality: 0.5, base64: true };
		const data = await camera.takePictureAsync(options);
		//  eslint-disable-next-lin
		this.setState({images:data.uri, camera_capture:data.uri})
		console.log(data.uri);
	}catch(err){
	console.log(err)
	    }
	  };
		
		

    
	

	addOrEdit() {

		if (this.state.isEdit) {

			return (
				<Btn
					label={'Edit Product'}
					onPress={() => this.uploadFile()}
				/>
			)
		} else {
			return (
				<Btn
					label={'Add Product'}
					onPress={() => this.uploadFile()}
				/>
			)
		}





	}
	addProduct() {

		console.log("data", this.state);
		/*
			  id: "",
		  name: "",
		  rating: "",
		  price: "",
		  description: null,
		  specification: "",
		  brand_name:"",
		  images: "",
	  	
		  */
		database().ref('Product/').push({
			id: this.state.id,
			name: this.state.name,
			rating: this.state.rating,
			price: this.state.price,
			description: this.state.description,
			specification: this.state.specification,
			brand_name: this.state.brand_name,
			images: this.state.images

		}).then((data) => {
			//success callback
			console.log('data ', data)
			this.setState({
				showAddressModal: false,
				id: "",
				name: "",
				rating: "",
				price: "",
				description: null,
				specification: "",
				brand_name: "",
				images: "",
				camera_capture:""
			})
		}).catch((error) => {
			//error callback
			console.log('error ', error)
			Alert.alert("Gagal Insert", error)
		})

	}


	editProduct() {

		console.log("data", this.state);
		/*
			id: "",
		  name: "",
		  rating: "",
		  price: "",
		  description: null,
		  specification: "",
		  brand_name:"",
		  images: "",
		  
		  */
		database().ref('Product/' + this.state.key).update({
			id: this.state.id,
			name: this.state.name,
			rating: this.state.rating,
			price: this.state.price,
			description: this.state.description,
			specification: this.state.specification,
			brand_name: this.state.brand_name,
			images: this.state.images

		}).then((data) => {
			//success callback
			console.log('data ', data)
			this.setState({
				showAddressModal: false,
				id: "",
				name: "",
				rating: "",
				price: "",
				description: null,
				specification: "",
				brand_name: "",
				images: "",
				camera_capture:""
			})
		}).catch((error) => {
			//error callback
			console.log('error ', error)
			Alert.alert("Gagal Update", error)
		})

	}


}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  flexDirection: 'column',
	  backgroundColor: 'black',
	},
	preview: {
	  flex: 1,
	  justifyContent: 'flex-end',
	  alignItems: 'center',
	},
	capture: {
	  flex: 0,
	 
	 
	  padding: 15,
	  paddingHorizontal: 20,
	  alignSelf: 'center',
	  margin: 20,
	},
  });

export default Addproduct;