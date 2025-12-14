import CardVisitorPhoto from "./components/CardVisitorPhoto";
import SearchPersonForm from "@/components/molecules/SearchPersonForm";
import useTranslation from "@/hooks/useTranslation";
import useControlFormRestrictedUsers from "./useControlFormRestrictedUsers";
import CreateVisitorForm from "@/components/organisms/CreateVisitorForm";
import { useState } from "react";
import { TRANS } from "./constants";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import Modal from "@/components/atoms/Dialog";

export default function ControlFormRestrictedUsers() {
	const TEXTS = useTranslation(TRANS)
	// const GTEXTS = useTranslation(GTRANS)
	const [isOpenModalAddVisitor, setIsOpenModalAddVisitor] = useState(false)

	const toggleModalAddVisitor = ()=> {
		setIsOpenModalAddVisitor(!isOpenModalAddVisitor)
	}

	const {
		hasFinished,
		visitor,
		onLoadResult,
		onSearchVisitor,
	} = useControlFormRestrictedUsers()

	return (
		<>
			<SearchPersonForm
				onSearch={onSearchVisitor}
				onResult={onLoadResult}
			/>
			<div className="my-4">
				{visitor && <Divider text={TEXTS.heading_results_for.replace('[NAME]', visitor.fullname)} />}
			</div>
			{!visitor ? (
				hasFinished && (
					<div className="mt-12 text-center">
						<Button 
							text="Usuario no encontrado, Registrar datos básicos de usuario"
							onClick={toggleModalAddVisitor}
						/>
					</div>
				)
			) : (
				<CardVisitorPhoto visitor={visitor} />
			)}

			<Modal show={isOpenModalAddVisitor} onClose={toggleModalAddVisitor}>
				<CreateVisitorForm
					visitId={0}
					onCancel={toggleModalAddVisitor}
					onIncreaseVisitorsCounter={() => 0}
					optionalFields={true}
					cutomTitleForm={"Registrar datos básicos"}
					isNewVisitorBasicForm={true}
				/>
			</Modal>
		</>
	)
}