import FullLoader from "@/components/atoms/FullLoader";
import InputGroup from "@/components/atoms/InputGroup";
import LabelForm from "@/components/atoms/LabelForm";
import Select from "@/components/atoms/Select";
import { GTRANS, IDENTIFICATION_TYPE_CODE_CC } from "@/constants/Globals";
import useTranslation from "@/hooks/useTranslation";
import { SearchPersonFormProps } from "@/interfaces/Molecules";
import { ErrorMessage } from "@hookform/error-message";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { TRANS } from "./constants";
import useSearchPersonForm from "./useSearchPersonForm";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/atomsv2/Button";

export default function SearchPersonForm({ onSearch, onResult, onFail }: SearchPersonFormProps) {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	const [typeDocumentsOptions, setTypeDocumentsOptions] = useState([])

	const {
		isInnerLoading,
		control,
		errors,
		register,
		handleSubmit,
		onSubmit,
		loadIdentificationTypes,
		getIdByCode,
	} = useSearchPersonForm(onSearch, onResult, onFail)

	useEffect(() => {
		loadIdentificationTypes()
			.then((options) => options.map((option) => ({
				label: option.label,
				value: option.value
			})))
			.then(setTypeDocumentsOptions)
	}, [])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="relative">
				{isInnerLoading && (
					<FullLoader variant="absolute" />
				)}
				<div className="flex items-end gap-4">
					<div>
						<LabelForm label={TEXTS.label_document_type} />
						<Controller
							name="document_type"
							control={control}
							rules={{ required: GTEXTS.required }}
							render={({ field }) => (
								<Select
									{...field}
									defaultValue={getIdByCode(IDENTIFICATION_TYPE_CODE_CC)}
									onChange={(item) => field.onChange(item)}
									options={typeDocumentsOptions}
								/>
							)}
						/>
						<ErrorMessage
							errors={errors}
							name="document_type"
							render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
						/>
					</div>
					<div>
						<LabelForm label={TEXTS.label_document} />
						<InputGroup
							type="text"
							placeholder={TEXTS.label_document}
							{...register("document_or_name", { required: GTEXTS.required })}
						/>
						<ErrorMessage
							errors={errors}
							name="document_or_name"
							render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
						/>
					</div>
					<div>
						<Button type="submit" color="dark">
							<MagnifyingGlassIcon className="inline w-4 h-4" />
							{TEXTS.search}
						</Button>
					</div>
				</div>
			</div>
		</form>
	)
}