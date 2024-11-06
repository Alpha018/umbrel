import {useRef, useState} from 'react'
import {useMount} from 'react-use'

import {ImmersiveDialogBody} from '@/components/ui/immersive-dialog'
import {Button} from '@/shadcn-components/ui/button'
import {PasswordInput} from '@/shadcn-components/ui/input'
import {t} from '@/utils/i18n'

import {description, title} from './misc'

export function ConfirmWithPassword({
	error,
	onSubmit,
	clearError,
}: {
	error: string
	onSubmit: (password: string) => void
	clearError: () => void
}) {
	const passwordRef = useRef<HTMLInputElement>(null)
	const [password, setPassword] = useState('')

	// Clear password and errors so we don't see it when we come back to this page
	useMount(() => {
		setPassword('')
		clearError()
	})

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onSubmit(password)
		setPassword('')
	}

	return (
		<form onSubmit={handleSubmit} className='flex-1'>
			<ImmersiveDialogBody
				title={title()}
				description={description()}
				bodyText={t('factory-reset.confirm.body')}
				footer={
					<>
						<Button type='submit' variant='destructive' size='dialog' className='min-w-0'>
							{t('factory-reset.confirm.submit')}
						</Button>
						<div className='text-13 text-destructive2'>{t('factory-reset.confirm.submit-callout')}</div>
					</>
				}
			>
				<label>
					<div className='mb-1 text-14 leading-tight'>{t('factory-reset.confirm.password-label')}</div>
					<PasswordInput
						autoFocus
						inputRef={passwordRef}
						sizeVariant='short'
						value={password}
						onValueChange={setPassword}
						error={error}
					/>
				</label>
			</ImmersiveDialogBody>
		</form>
	)
}
