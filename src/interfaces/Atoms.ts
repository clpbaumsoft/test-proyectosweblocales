import { ReactNode } from "react";
import { PickerChangeHandlerContext } from "@mui/x-date-pickers";

import type { RefObject } from "react";
import type { Moment } from "moment";
import type { AlertColor, InputProps, SxProps, TextFieldProps, Theme } from "@mui/material";

import {
	ArrayActionsType,
	BaseComponentProps,
	ItemSelector,
} from "./General";
import { DocumentType, Visit, Visitor } from "./Models";

export type FullLoaderProps = BaseComponentProps & {
	variant?: string;
	size?: 'normal' | 'small';
}

export type InlineAlertProps = BaseComponentProps & {
	message: string;
	type?: 'success' | 'error';
}

export type VisitRow = Visit & {
	company_name: string;
	branch_name: string;
	gate_name: string;
	visitors_count?: number;
}

export type DateTimePickerProps = BaseComponentProps & {
	defaultValue: string | Moment | null;
	onChange?: (date: Moment | null) => void;
	displayFormat?: string;
	minDate?: Moment | null;
}

export type ButtonFileProps = BaseComponentProps & Omit<InputProps, 'onChange'> & {
	onChange: (theFile: File) => void;
	defaultValueImage: null | string;
	accept?: string;
	buttonProps?: ButtonProps;
}

export type ErrorBoundaryStateType = {
	hasError: boolean;
}

export type PreviewImageProps = BaseComponentProps & {
	width: number;
}

export type ModalFullScreenProps = BaseComponentProps & {
	title: string;
	subTitle?: string;
	open: boolean;
	textAction: string;
	handleClose: () => void;
	handleAction: () => void;
	addFixedRowSave?: boolean;
}

export type RowUploadFile = {
	isSaved?: boolean;
	hasError?: boolean;
	message?: string;
	file: File;
	document_type: number | null;
	description: string | null;
}

export type ItemThumbFileProps = BaseComponentProps &  {
	itemFile: RowUploadFile;
	indexFile: number;
	actionsFiles: ArrayActionsType<RowUploadFile>;
	documentTypes: DocumentType[];
}

export type ThumbsFilesProps = BaseComponentProps & {
	files: RowUploadFile[];
	actionsFiles: ArrayActionsType<RowUploadFile>;
	documentTypes: DocumentType[];
}

export type UploadDocumentsProps = BaseComponentProps & {
	files: RowUploadFile[];
	actions: ArrayActionsType<RowUploadFile>;
	maxFiles?: number;
	documentTypes: DocumentType[];
}

export type ItemListFileProps = BaseComponentProps & {
	label: ReactNode;
	itemsSelector: ItemSelector[];
	onChangeDescription: (newDestiption: string) => void;
	onChangeSelector: (newItemSelectorValue: string | number) => void,
}

export type InputAutocompleteProps = BaseComponentProps & {
	defaultValue?: string;
	onChange: (newVal: ItemSelector) => void;
	emitGetOptions: (criteria: string) => Promise<ItemSelector[]>;
	helpText?: string;
}

export type CounterTextFieldProps = BaseComponentProps & {
	textFieldProps: TextFieldProps;
	helperText?: string;
	isHidden?: boolean;
}

export type CustomDatePickerProps<TValue, TError> = BaseComponentProps & {
	label?: string;
	inputProps?: TextFieldProps;
	onChange?: (value: TValue, context: PickerChangeHandlerContext<TError>) => void;
}

export type WarningConditionProps = BaseComponentProps & {
	condition: boolean;
	severity?: AlertColor;
}

export type SelectLoadedItemsProps = BaseComponentProps & {
	fetchItems: () => Promise<ItemSelector[]>;
	onChangeValue: (value: ItemSelector | null) => void;
	defaultValue?: string | number | null;
	inputProps?: Pick<InputProps, 'fullWidth' | 'size'>;
	cachedKey?: string;
	disabled?: boolean;
}

export type TakePhotoProps = BaseComponentProps & {
	preview?: string | null;
	isButtonActive?: boolean;
	onSavePhoto?: (theFile: File) => Promise<void>;
}

export type CapturePhotoProps = BaseComponentProps & {
	videoRef: RefObject<HTMLVideoElement | null>;
	canvasRef: RefObject<HTMLCanvasElement | null>;
}

export type CardVisitorProps = BaseComponentProps & {
	visitor: Visitor | null;
}

export type ButtonViewRestrictedUserProps = {
	text?: string | null;
	isLink?: boolean | null;
	documentVisitor?: string | null;
}

export type LabelItemProps = BaseComponentProps & {
	label: string;
	value: ReactNode;
	pl?: string;
	sx?: SxProps<Theme>;
}

export type GroupCheckboxInputProps = {
	fetchItems: () => Promise<ItemSelector[]>;
	onAddItemValue?: (value: ItemSelector) => void;
	onRemoveItemValue?: (index: number) => void;
	onChange?: (values: ItemSelector[]) => void;
	defaultValues?: unknown[];
	inputProps?: Pick<InputProps, 'fullWidth' | 'size'>;
	cachedKey?: string;
}

export type FormMessagesProps = BaseComponentProps & {
	message: string | null;
	error: string | null;
}

export type TabPanelProps = BaseComponentProps & {
	index: number;
	activeIndex: number;
}

export type LabelFormProps = BaseComponentProps & {
	label: string;
	required?: boolean;
}

export type ButtonProps = BaseComponentProps & {
  type?: "button" | "submit" | "reset";
  text?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export type SelectProps = BaseComponentProps & {
	name?: string;
	value?: string;
	disabled?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	options?: { label: string; value: string }[];
}

export type InputGroupProps = BaseComponentProps & {
	name?: string;
	type?: string;
	placeholder?: string;
	value?: string | number;
	disabled?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type TableProps = BaseComponentProps & {
  tableHeads: string[]
  tableRows?: ReactNode[]
  isLoading?: boolean
  loadingMessage?: string
  emptyMessage?: string
  loadingComponent?: ReactNode
  emptyComponent?: ReactNode
  className?: string
}