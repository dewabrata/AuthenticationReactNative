import React from 'react';
import {
	FlatList,
	Modal
} from 'react-native';

import {Wrapper, Header, Left, Right, Container, Space, Row, Column, H1, H2, Footer, FloatingLabelInput, Picker, Btn, IconBtn} from '../utils';
import sample_data from '../../sample_data';

import  ProductListItem from '../reuse/ProductListItem';

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
		images: "",
	}
    
	_keyExtractor = (item, index) => item.id;

	inputs = {};

    focusNextField(field) {
        if(inputs[field] !== undefined) {
            inputs[field].focus();
        }
    }

	
	render() {



		return (
		
				
				<>
					<H1>Tambah Data Barang</H1>
					
					<FlatList
						data={sample_data.items}
						keyExtractor={(item) => item.id}
						extraData={this.state}

						renderItem={({item}) => <ProductListItem item={item} onPress={() => setSelectedId(item.id)} />}
					/>

                  <Btn label="Add Data"/>
                  
                  <Modal
		        	animationType="slide"
		        	transparent={true}
		        	visible={this.state.showAddressModal}
		        >
		        	
		        </Modal>
				</>
              
			
		)
	}
}

export default Addproduct;