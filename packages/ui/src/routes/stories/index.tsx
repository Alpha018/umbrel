'use client'

import {useMotionValue} from 'framer-motion'
import {Globe, User} from 'lucide-react'
import {useState} from 'react'
import {objectKeys} from 'ts-extras'

import {ChevronDown} from '@/assets/chevron-down'
import {sizeMap} from '@/components/ui/icon'
import {IconButton} from '@/components/ui/icon-button'
import {InstalledAppsProvider, useInstalledApps} from '@/hooks/use-installed-apps'
import {useUmbrelTitle} from '@/hooks/use-umbrel-title'
import {H1, H2, H3} from '@/layouts/stories'
import {AppGrid} from '@/modules/desktop/app-grid/app-grid'
import {AppIcon} from '@/modules/desktop/app-icon'
import {DesktopPreview} from '@/modules/desktop/desktop-preview'
import {DockItem} from '@/modules/desktop/dock-item'
import {
	ActionsWidget,
	BackdropBlurVariantContext,
	FourUpWidget,
	NotificationsWidget,
	ProgressWidget,
	StatWithButtonsWidget,
	ThreeUpWidget,
} from '@/modules/desktop/widgets'
import {TablerIcon} from '@/modules/desktop/widgets/tabler-icon'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/shadcn-components/ui/alert-dialog'
import {Button} from '@/shadcn-components/ui/button'
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from '@/shadcn-components/ui/context-menu'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shadcn-components/ui/dropdown-menu'
import {Input} from '@/shadcn-components/ui/input'
import {Switch} from '@/shadcn-components/ui/switch'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/shadcn-components/ui/tooltip'

function DockItemInteractive() {
	const [open, setOpen] = useState(false)
	const mouseX = useMotionValue(-1000)

	return <DockItem bg='/dock/home.png' mouseX={mouseX} open={open} onClick={() => setOpen(true)} />
}

export function Stories() {
	useUmbrelTitle('Stories Home')

	return (
		<div className='flex flex-col gap-4 bg-white/20 p-4'>
			<H1>Stories</H1>
			<H2>Buttons</H2>
			<Buttons />
			<H2>Alert Dialog</H2>
			<AlertDialogExample />
			<H2>Tooltip</H2>
			<TooltipExample />
			<H2>Switch</H2>
			<Switch />
			<H2>Dropdown</H2>
			<DropdownExample />
			<H2>Context Menu</H2>
			<ContextMenuExample />
			<H2>Desktop Preview</H2>
			<InstalledAppsProvider>
				<DesktopPreview />
			</InstalledAppsProvider>
			<H2>Dock</H2>
			<DockExample />
			<H2>Widgets</H2>
			<WidgetExamples />
			<H2>App Grid</H2>
			<InstalledAppsProvider>
				<AppGridExamples />
				<AppsDump />
			</InstalledAppsProvider>
		</div>
	)
}

function TooltipExample() {
	return (
		<Tooltip>
			<TooltipTrigger>Hover</TooltipTrigger>
			<TooltipContent>
				<p>Add to library</p>
			</TooltipContent>
		</Tooltip>
	)
}

function AlertDialogExample() {
	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant='destructive'>Delete account</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your account and remove your data from our
							servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			{/* <div className="fixed bottom-0 left-0 z-[99]">
        <button className="cursor-pointer" onClick={() => alert("hello")}>
          Click
        </button>
      </div> */}
		</div>
	)
}

function DropdownExample() {
	const [position, setPosition] = useState('bottom')

	return (
		<div className='flex gap-2'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<IconButton icon={Globe}>
						English
						<ChevronDown />
					</IconButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuCheckboxItem checked>English</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem>French</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{/*  */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<IconButton icon={User}>
						Account
						<ChevronDown />
					</IconButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Billing</DropdownMenuItem>
					<DropdownMenuItem>Team</DropdownMenuItem>
					<DropdownMenuItem>Subscription</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{/*  */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<IconButton icon={User}>
						Account
						<ChevronDown />
					</IconButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
						<DropdownMenuRadioItem value='top'>Top</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='bottom'>Bottom</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

function ContextMenuExample() {
	const [position, setPosition] = useState('bottom')

	return (
		<div className='grid place-items-center bg-white/5 p-4'>
			<ContextMenu modal={false}>
				<ContextMenuTrigger asChild>
					<div className='grid h-36 w-full max-w-sm place-items-center border border-dashed'>Right click</div>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem>Edit Widgets</ContextMenuItem>
					<ContextMenuItem>Change wallpaper</ContextMenuItem>
					<ContextMenuCheckboxItem checked>Show desktop icons</ContextMenuCheckboxItem>
					<ContextMenuSeparator />
					<ContextMenuRadioGroup value={position} onValueChange={setPosition}>
						<ContextMenuRadioItem value='top'>Top</ContextMenuRadioItem>
						<ContextMenuRadioItem value='bottom'>Bottom</ContextMenuRadioItem>
						<ContextMenuRadioItem value='right'>Right</ContextMenuRadioItem>
					</ContextMenuRadioGroup>
				</ContextMenuContent>
			</ContextMenu>
		</div>
	)
}

function Buttons() {
	return (
		<div className='flex flex-col gap-2'>
			<div>
				<H3>Sizes</H3>
				<div className='flex gap-2'>
					{objectKeys(sizeMap).map((size) => (
						<div key={size} className='flex flex-col gap-2'>
							<div>{size}</div>
							<Button size={size}>Settings</Button>
							<Button variant='primary' size={size}>
								Settings
							</Button>
							<Button variant='secondary' size={size}>
								Settings
							</Button>
							<Button variant='destructive' size={size}>
								Settings
							</Button>
						</div>
					))}
				</div>
				<div className='flex gap-2'>
					{objectKeys(sizeMap).map((size) => (
						<div key={size} className='flex flex-col gap-2'>
							<div>{size}</div>
							<IconButton size={size} icon={Globe}>
								Settings
							</IconButton>
							<IconButton variant='primary' size={size} icon={Globe}>
								Settings
							</IconButton>
							<IconButton variant='secondary' size={size} icon={Globe}>
								Settings
							</IconButton>
							<IconButton variant='destructive' size={size} icon={Globe}>
								Settings
							</IconButton>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

function AppsDump() {
	const {installedApps, isLoading} = useInstalledApps()

	if (isLoading) return

	return (
		<div className='flex flex-col gap-4 p-4'>
			<H2>Apps dump</H2>
			<div className='flex flex-wrap items-center'>
				{installedApps.map((app) => (
					<div key={app.id} className='flex h-28 w-28 flex-col items-center gap-2.5 p-3 pb-0'>
						<img alt={app.name} src={app.icon} width={64} height={64} className='rounded-15' />
						<span className='max-w-full truncate text-13'>{app.name}</span>
					</div>
				))}
			</div>
		</div>
	)
}

function DockExample() {
	const mouseX = useMotionValue(Infinity)

	return (
		<>
			<div className='flex items-center gap-4 rounded-15 bg-neutral-800 p-3'>
				<DockItem bg='/dock/home.png' mouseX={mouseX} notificationCount={0} />
				<DockItem bg='/dock/home.png' mouseX={mouseX} notificationCount={1} />
				<DockItem bg='/dock/home.png' mouseX={mouseX} notificationCount={2} />
				<DockItem bg='/dock/home.png' mouseX={mouseX} notificationCount={99} />
				<DockItem bg='/dock/home.png' mouseX={mouseX} notificationCount={999} />
				<H2>Interactive:</H2>
				<DockItemInteractive />
				<H2>No bg:</H2>
				<DockItem mouseX={mouseX} notificationCount={2} />
			</div>
		</>
	)
}

function WidgetExamples() {
	const [iconName, setIconName] = useState('cpu')

	return (
		<div>
			<div className='p-6'>
				<Input value={iconName} onChange={(e) => setIconName(e.target.value)} />
				<TablerIcon iconName={iconName} />
			</div>
			<BackdropBlurVariantContext.Provider value='default'>
				<main className='flex flex-wrap gap-6 overflow-hidden bg-cover bg-center p-6'>
					{/* <Widget
          title="Blockchain sync"
          value="86.92%"
          progress={0.8692}
          label="Bitcoin Node"
          withBackdropBlur
        />
        <Widget
          title="Storage"
          value="256 GB"
          valueSub="/ 2 TB"
          progress={(256 / 1024) * 2}
          progressLabel="1.75 TB left"
          label="Settings"
          withBackdropBlur
        /> */}
					<div className='w-full'>Settings</div>
					<ProgressWidget
						title='Storage'
						value='256 GB'
						valueSub='/ 2 TB'
						progressLabel='1.75 TB left'
						progress={0.25}
					/>
					<ProgressWidget
						title='Memory'
						value='5.8 GB'
						valueSub='/ 16 GB'
						progressLabel='11.4 GB left'
						progress={0.3625}
					/>
					<ThreeUpWidget />
					<div className='w-full'>Bitcoin</div>
					<ProgressWidget title='Blockchain sync' value='86.92%' progress={0.8692} />
					<StatWithButtonsWidget title='Bitcoin Wallet' value='1,845,893' valueSub='sats' />
					<FourUpWidget />
					<div className='w-full'>Nostr</div>
					<ActionsWidget />
					<NotificationsWidget />
				</main>
			</BackdropBlurVariantContext.Provider>
		</div>
	)
}

function AppGridExamples() {
	const {installedApps} = useInstalledApps()
	return (
		<>
			<div>No apps</div>
			<AppGridWrapper>
				<AppGrid />
			</AppGridWrapper>
			<div>1 app</div>
			<AppGridWrapper>
				<AppGrid
					apps={installedApps.slice(0, 1).map((app) => (
						<AppIcon key={app.id} appId={app.id} src={app.icon} label={app.name} />
					))}
				/>
			</AppGridWrapper>
			<div>3 apps</div>
			<AppGridWrapper>
				<AppGrid
					apps={installedApps.slice(0, 3).map((app) => (
						<AppIcon key={app.id} appId={app.id} src={app.icon} label={app.name} />
					))}
				/>
			</AppGridWrapper>
			<div>All apps</div>
			<AppGridWrapper>
				<AppGrid
					apps={installedApps.map((app) => (
						<AppIcon key={app.id} appId={app.id} src={app.icon} label={app.name} />
					))}
				/>
			</AppGridWrapper>
		</>
	)
}

function AppGridWrapper({children}: {children: React.ReactNode}) {
	return <div className='h-[400px] w-full overflow-hidden bg-neutral-900'>{children}</div>
}
