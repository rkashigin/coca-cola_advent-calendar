import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { RootStore } from '../stores/RootStore';

const UserDataTest = observer(() => {
	useEffect(() => {
		console.log(toJS(RootStore.user));
	}, [RootStore.user]);
	return (
		<div>
			{/* <p>
				{RootStore.user?.name}
			</p>
			<p>
				{RootStore.user?.id}
			</p>
			<p>
				{RootStore.user?.phone}
			</p> */}
		</div>
	);
});

export default UserDataTest;
