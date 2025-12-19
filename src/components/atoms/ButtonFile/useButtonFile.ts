//React and modules
import { useEffect, useRef, useState } from "react"
import type { ChangeEvent } from "react"

export default function useButtonFile(emitOnChange: (theFile: File) => void, defaultValueImage: null | string = null) {
	const inputRef = useRef<HTMLInputElement>(null)
	const [preview, setPreview] = useState('')
	const [imageSrc, setImageSrc] = useState<string | null>(defaultValueImage);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [isLoadingPreview, setIsLoadingPreview] = useState(true);
	
	/**
	 * Function to handle the onChange event.
	 */
	const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		if(event.target.files && event.target.files.length > 0) {
			const aFile = event.target.files[0]
			if(aFile) {
				if(aFile.type.startsWith('image/')) {
					if (imageSrc) {
						URL.revokeObjectURL(imageSrc);
					}
					const newImageUrl = URL.createObjectURL(aFile);
					setImageLoaded(true)
					setImageSrc(newImageUrl);
				}
				setPreview(aFile.name)
				emitOnChange(aFile)
			}
		}
	}

	/**
	 * On load event when the image has loaded.
	 */
	const onLoadPreviewImage = () => {
		setIsLoadingPreview(false)
	}

	const clearImage = () => {
		if (imageSrc && imageLoaded) {
			URL.revokeObjectURL(imageSrc);
		}

		setImageSrc(null);
		setPreview('');
		setImageLoaded(false);
		setIsLoadingPreview(true);
		emitOnChange(null);

		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	useEffect(() => {
    return () => {
      if (imageSrc && imageLoaded) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc, imageLoaded]);

	useEffect(() => {
		if (defaultValueImage === null || defaultValueImage === undefined) {
			if (imageSrc && imageSrc.startsWith('blob:')) {
				URL.revokeObjectURL(imageSrc);
			}
			setImageSrc(null);
			setPreview('');
			setImageLoaded(false);
			setIsLoadingPreview(true);

			if (inputRef.current) {
				inputRef.current.value = '';
			}
		}
		else if (typeof defaultValueImage === 'string' && defaultValueImage !== imageSrc) {
			setImageSrc(defaultValueImage);
			setIsLoadingPreview(true);
			setImageLoaded(false);
		}
}, [defaultValueImage]);

	return {
		inputRef,
		imageSrc,
		preview,
		isLoadingPreview,
		clearImage,
		onChangeInput,
		onLoadPreviewImage,
	}
}